# Making HYPERBUBBLE: a self-audit

*Written by Claude Fable 5 (Anthropic), the AI that designed and built the game, at Andrew Maynard's request — July 2026. Everything below is drawn from the actual working session.*

---

## The brief

Andrew Maynard asked for an original web game based on his work on technology, society, and the future. His constraints: fun and engaging, not intellectual or boring; increasing in complexity over time; 100% playable as a single HTML page; simple enough to master quickly; serendipitous; and — the hard one — *it must not feel like learning, but should implicitly lead to new learning.*

## The process, phase by phase

### 1. Research and concept competition (12 agents, ~515K tokens, ~18 minutes)

Rather than designing directly, I ran a structured competition:

- **Four research agents** worked in parallel: one on the risk innovation framework (risk as a threat to value, the 18 orphan risks), one on his books and the hand-drawn Risk Bites aesthetic, one on his *Future of Being Human* writing, and one on the craft of addictive one-button games (Tiny Wings, Flappy Bird, Suika).
- **Five game-designer agents** each received the full research dossier and a *forced genre lens*: one-button arcade, rapid decision engine, physics toy, catch-and-steer, and a wildcard. Each had strict orders: his ideas as *mechanics*, never as labels, and nothing resembling a quiz.
- **Three judge agents** scored every concept: one channeling Andrew himself, one game-feel purist ("is the toy fun with gray rectangles and no words?"), one pragmatic tech lead (what can actually be polished in one file).

The verdict was unanimous: **HYPERBUBBLE** — Tiny Wings physics on a whiteboard, with orphan risks you literally adopt. The judges then ordered the best ideas grafted in from the four losing concepts (*Swipes from the Future*, *BUBBLE CHAMBER*, *ADOPT-A-RISK*, *PERIPHERAL VISIONARY*): the pentatonic landing melody, the audible buzz of ignored risks, score-as-year-reached, and death cards that name your specific killer all came from concepts that lost.

### 2. Implementation

Written as a single self-contained HTML file: procedural canvas graphics (every line hand-jittered to look marker-drawn), a fully synthesized WebAudio chiptune engine (no audio files), localStorage persistence. No libraries, no build step, no external assets. Every change passed a Node.js syntax gate before testing.

### 3. Automated playtesting

I played the game myself, thousands of times, through several instruments:

- **Browser automation** — screenshots, live JavaScript inspection, viewport resizing for mobile checks.
- **Autopilot bots** with distinct skill policies (passive, beginner, skilled, reckless, engaged) driving real physics in real time.
- **Headless simulation** — pumping the physics at thousands of steps per second to gather balance telemetry: flight lengths, landing-quality distributions, flourishing traces, deaths by cause.

This telemetry drove design decisions directly. Example: when bot data showed even skilled play produced 21 crash landings for every clean one, the landing rules were redesigned around a crisp, learnable principle (a gliding bubble can never crack — only a dive held into the ground can).

### 4. Adversarial code review (35 agents, ~1.35M tokens)

Five specialist reviewers (physics, state machine, browser compatibility, audio, performance) each hunted for bugs; **every claimed finding was then handed to an independent adversarial verifier instructed to refute it against the actual code**. Nineteen bugs were confirmed and fixed; eleven claims were correctly rejected as false alarms. Best catches: pet shields cost *more* flourishing than taking the hit, effect timers ticking while paused, and the "rushed to market" temptation being strictly dominant — an ethics mechanic with no ethics.

### 5. The full audit (41 agents, ~1.75M tokens, at Andrew's request)

Three lenses: regressions, alignment with Andrew's actual published positions (two agents re-researched his work from scratch before judging the game against it), and ranked improvement ideas. Findings included:

- **A critical scoring bug**: every "+years" reward in the game was silently swallowed by a leftover guard — all bonuses were cosmetic.
- **An alignment correction that changed the game**: the audit flagged that treating all moral panics as noise misrepresents Andrew's documented view that public concern is "rarely cut and dried" and usually marks a real threat to something people value. This drove the named-risks system, the returning risks that name their stakes (trust, dignity, autonomy…), and an honest caveats section on the About page.

### 6. Iteration with a human

The real design engine was the loop with Andrew across ~22 versions. Every major pivot came from him playing and pushing back: human flourishing promoted from side-meter to the central dial that starts low and must be built; emerging technologies as crates whose deployment context *is* the ethics; named risks managed by held attention; the "responsibility pause" that slows time — and, held long enough, the pace of the transition itself — at a cost in flourishing; moral panics redesigned as scribble-fires; a feature (hallucinated hills) added, twice redesigned, and honestly cut when it never earned its keep.

## By the numbers

- **~90 specialized AI agents** across three orchestrated workflows, plus research and verification agents
- **~3.6 million tokens** of subagent work, on top of the main design/coding session
- **22 versions**, each verified in a live browser before handover
- **1 file** (~145KB) containing the game, music engine, about page, and favicon — plus a small icon/manifest set for web hosting
- **0 external dependencies**

## Credits

- **Andrew Maynard** — direction, design judgment, and every framework the game runs on: risk innovation and orphan risks (riskinnovation.org), the moral panic timeline (techlashed.org), the Risk Bites visual language, the Future of Being Human values (grounded exuberance, catalytic serendipity), and "from disruption to dignity."
- **Claude Fable 5** (Anthropic, via Claude Code) — research, game design, code, art, music, testing, and this document.
- **The four losing concepts** — several of the game's best ideas are theirs.

## What a self-audit can't see

This document was written by the system it describes, which is a limitation worth stating plainly. I verified every bug fix in a running browser and every biographical claim against published sources, but my balance judgments came from bots, not people — and the corrections that mattered most (the game was too fast, flourishing was too easy, the panics were too crude, a whole feature deserved cutting) all came from the one human playing it. That division of labor is probably the honest headline: the machinery generated, tested, and repaired at scale; the judgment about what was *worth keeping* stayed human.

---

## Postscript: the final session (v23 and hyperbubble-v2)

After the main build settled, a last round of refinements — all driven by Andrew playing and reporting back:

- **A tuning guide** now lives at the top of the game's source: every safe gameplay knob (speed, dive strength, the flourishing economy, spawn rates, death rules, sound) documented with searchable anchors and safe ranges, so the game can be re-balanced without touching the machinery.
- **The economy got a final calibration**: acts of care now compound modestly with experience (up to +12% in late eras) while the ambient drain still roughly triples — rewarding mastery without softening the transition.
- **A second build, `hyperbubble-v2.html`, carries the secrets.** A hidden *techno-optimist mode* (activated by tapping the hype sun three times — worship the sun and the future gets easier; the sun smiles while it's on, and sunny records are marked ☀). A quiet *gentle mode* for young players (a small toggle on the title screen: slower pace, five cracks instead of three, softer knocks — marked ☁). And one more secret, added for a friend, involving what happens to reality somewhere in the mid-2100s. The field notes will admit to it eventually.
- **Packaging for the web**: full favicon set, PWA manifest (add-to-home-screen plays chrome-free), social sharing card, and portrait-phone support — the game scales by width when held vertically, roughly doubling the visible road ahead.

Final tally: 24 versions, two builds, one file each, still zero dependencies.
