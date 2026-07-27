// HYPERBUBBLE leaderboard — Cloudflare Worker (paste into the dashboard editor, replace everything).
// Bindings required: D1 database as `DB` (already connected).
// Endpoints:
//   GET  /top?board=open|gentle|opt|both|daily[&day=YYYYMMDD]   → top 50, cached 30s at the edge
//   POST /submit  {board, handle, year, hills, flo, glyphs, day?} → upsert best-per-player
// Security posture: CORS locked to fvture.net; strict input validation; year hard-capped at 4500
// (the Sublimation is the ceiling the game itself enforces); per-IP rate limit; body-size cap;
// boards pruned to 500 rows so the table can never grow unbounded. No names typed by players,
// no accounts, no personal data stored — handle + numbers + timestamp only.

const BOARDS = ['open', 'gentle', 'opt', 'both', 'daily'];
const BLOCK = ['ASS','FUK','FUC','FCK','FKU','SEX','CUM','DIK','DCK','COK','KKK','NIG','FAG','TIT','VAG','JIZ','PIS','GOD','DIE','KYS'];
// 'null' is the Origin a file:// page sends — allowed so Andrew's local copies work.
// CORS is browser courtesy, not the security boundary (validation above is); reflecting
// these origins leaks nothing. Vary keeps the edge cache honest per origin.
const ORIGINS = ['https://fvture.net', 'http://localhost:8321', 'null'];
let CORS = {
  'Access-Control-Allow-Origin': 'https://fvture.net',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Vary': 'Origin',
};
const json = (o, status = 200, extra = {}) =>
  new Response(JSON.stringify(o), { status, headers: { 'Content-Type': 'application/json', ...CORS, ...extra } });

const utcDay = (offsetDays = 0) => {
  const d = new Date(Date.now() + offsetDays * 86400000);
  return d.getUTCFullYear() * 10000 + (d.getUTCMonth() + 1) * 100 + d.getUTCDate();
};

// per-isolate rate limiter — resets when the isolate recycles, which is fine:
// it only needs to blunt bursts, not keep books.
const hits = new Map();
function limited(ip){
  const now = Date.now();
  const rec = (hits.get(ip) || []).filter(t => now - t < 3600000);
  // v79: per-IP, sized for a whole classroom behind one router (30 players x a few
  // posted runs x the mode+open double-post). spam control really lives in the
  // validation + best-per-name upsert + 500-row prune, not here.
  if (rec.length >= 120) return true;
  rec.push(now); hits.set(ip, rec);
  if (hits.size > 5000) hits.clear();
  return false;
}

export default {
  async fetch(req, env){
    const url = new URL(req.url);
    const o = req.headers.get('Origin');
    CORS = { ...CORS, 'Access-Control-Allow-Origin': ORIGINS.includes(o) ? o : 'https://fvture.net' };
    if (req.method === 'OPTIONS') return new Response(null, { headers: CORS });
    try {
      if (req.method === 'GET'  && url.pathname === '/top')    return await top(url, env);
      if (req.method === 'POST' && url.pathname === '/submit') return await submit(req, env);
    } catch (e) {
      return json({ error: 'server' }, 500);
    }
    return json({ error: 'not found' }, 404);
  }
};

async function top(url, env){
  const board = url.searchParams.get('board') || 'open';
  if (!BOARDS.includes(board)) return json({ error: 'bad board' }, 400);
  let day = 0;
  if (board === 'daily'){
    day = parseInt(url.searchParams.get('day') || '', 10) || utcDay();
    if (![utcDay(-1), utcDay(0), utcDay(1)].includes(day)) return json({ error: 'bad day' }, 400);
  }
  const { results } = await env.DB.prepare(
    'SELECT handle, year, hills, flo, glyphs FROM scores WHERE board = ?1 AND day = ?2 ORDER BY year DESC, ts ASC LIMIT 50'
  ).bind(board, day).all();
  return json({ board, day, scores: results }, 200, { 'Cache-Control': 'public, max-age=30' });
}

async function submit(req, env){
  const ip = req.headers.get('CF-Connecting-IP') || 'unknown';
  if (limited(ip)) return json({ error: 'slow down' }, 429);

  const raw = await req.text();
  if (raw.length > 600) return json({ error: 'too big' }, 413);
  let b; try { b = JSON.parse(raw); } catch { return json({ error: 'bad json' }, 400); }

  const board = b.board;
  if (!BOARDS.includes(board)) return json({ error: 'bad board' }, 400);

  const year  = b.year, hills = b.hills ?? 0, flo = b.flo ?? 0;
  if (!Number.isInteger(year)  || year  < 2027 || year  > 4500) return json({ error: 'bad year' }, 400);
  if (!Number.isInteger(hills) || hills < 0    || hills > 3000) return json({ error: 'bad hills' }, 400);
  if (!Number.isInteger(flo)   || flo   < 0    || flo   > 100)  return json({ error: 'bad flo' }, 400);

  const glyphs = typeof b.glyphs === 'string' ? b.glyphs : '';
  if (!/^[⁂✿☁☀]{0,4}$/u.test(glyphs)) return json({ error: 'bad glyphs' }, 400);  // ⁂ ✿ ☁ ☀ only

  const handle = typeof b.handle === 'string' ? b.handle.trim() : '';
  if (!/^[A-Za-z0-9][A-Za-z0-9 .'-]{1,25}$/.test(handle)) return json({ error: 'bad handle' }, 400);
  if (/^[A-Z]{2,3}$/.test(handle) && BLOCK.includes(handle)) return json({ error: 'bad handle' }, 400);

  let day = 0;
  if (board === 'daily'){
    day = parseInt(b.day, 10) || 0;
    if (![utcDay(-1), utcDay(0), utcDay(1)].includes(day)) return json({ error: 'bad day' }, 400);
  }

  await env.DB.prepare(
    `INSERT INTO scores (board, handle, day, year, hills, flo, glyphs, ts)
     VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8)
     ON CONFLICT (board, handle, day) DO UPDATE SET
       year = excluded.year, hills = excluded.hills, flo = excluded.flo,
       glyphs = excluded.glyphs, ts = excluded.ts
     WHERE excluded.year > scores.year`
  ).bind(board, handle, day, year, hills, flo, glyphs, Date.now()).run();

  // keep each board tidy — the table can never grow past 500 rows per board/day
  await env.DB.prepare(
    `DELETE FROM scores WHERE board = ?1 AND day = ?2 AND rowid NOT IN
     (SELECT rowid FROM scores WHERE board = ?1 AND day = ?2 ORDER BY year DESC, ts ASC LIMIT 500)`
  ).bind(board, day).run();

  return json({ ok: true });
}
