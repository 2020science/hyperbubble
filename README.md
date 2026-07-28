# HYPERBUBBLE

**Embrace the tech, navigate the risks, manage the hype — how far can you get?**

A one-button browser game about navigating powerful new technologies while keeping human flourishing alive — inspired by, and built from, the work of [Andrew Maynard](https://andrewmaynard.net), Professor of Advanced Technology Transitions at Arizona State University. Designed and coded by Anthropic's Claude in collaboration with Maynard, across four generations and eighty builds.

## Play

**Play it now at [playhyperbubble.com](https://playhyperbubble.com)** (also at [fvture.net/hyperbubble](https://fvture.net/hyperbubble/), its original home) — or just open `index.html` in any modern browser. The entire game is **one self-contained HTML file**: procedural hand-drawn graphics, a fully synthesized soundtrack, no libraries, no build step, no account, and (apart from the optional leaderboard) no internet required. On a phone, "add to home screen" gives you chrome-free play.

**One button.** Press and hold anywhere: the bubble turns heavy and drops. Let go: it floats. Ride the hills like a skier — hold on the way down, release at the bottom, fly.

**The point.** The year counter tells you how *far* you got. The pink bar — **human flourishing** — tells you how *well*. It leaks constantly as the pace of change rises, and climbs only through acts of care: adopt the wide-eyed orphan risks before they come back with teeth, starve the moral-panic fires of attention, hold your nerve through named hazards, deploy emerging technologies for good rather than riding the hype. At zero, the lights go out. Past 100, the future blooms.

**Slowing down is allowed.** Hold SHIFT (or rest two fingers on the screen) and the world slows down on purpose — the kind of pause people take together when a technology is moving faster than the questions. It genuinely drops the pace, cools the hype, and softens what bites — and it costs flourishing the whole time, because thinking time isn't free.

There's much more — a bestiary that fills in as you meet things, a daily challenge the whole world plays on the same seed, a soundtrack that grows with the eras, and a number of things best discovered rather than read about.

## The ideas

Nearly every rule is borrowed from real frameworks: risk as a threat to value, [orphan risks](https://riskinnovation.org), the [moral panic timeline](https://techlashed.org), the pacing problem, soft approaches to steering new technologies, and the question of what it means to be human in a technologically transformed future. The full story — including what the game gets right and what a toy can't carry — is on the **"the ideas behind this"** page inside the game itself.

## The leaderboard

The board is deliberately boring about data: **no accounts, no emails, no typed names, nothing personal** — players post under generated pseudonyms ("punctual comet 47") or arcade initials, only when they choose to, from the end-of-run card. The backend is the ~120-line Cloudflare Worker in [`leaderboard-worker/`](leaderboard-worker/), storing exactly five things per entry: a board name, a pseudonym, a year, a hill count, and a flourishing peak.

If you fork this game and host it elsewhere, the board won't work for you as-is — the Worker only accepts requests from its own origins (see `ORIGINS` in the code). Deploy your own Worker + D1 database (schema included) and point `BOARD_API` in `index.html` at it.

## What's in this repo

| Path | What it is |
|---|---|
| `index.html` | The entire game, current build (see the stamp bottom-right of the title screen) |
| `favicon.*`, `icon-*.png`, `apple-touch-icon.png`, `site.webmanifest` | Icons and PWA manifest |
| `social-card.png` | The link-preview card |
| `leaderboard-worker/` | The Cloudflare Worker + D1 schema behind the leaderboard |

## License

The code — the game and the leaderboard Worker — is released under the [MIT License](LICENSE): use it, learn from it, remix it. Not covered by that grant: the **HYPERBUBBLE** name, the social-card artwork as a brand mark, and Andrew Maynard's writings, frameworks, and identity — the frameworks are his scholarship (borrow the *ideas* with attribution, as this game does), and please don't ship something that looks like it came from him.

## Credits

- **Andrew Maynard** — the ideas, the direction, and the judgment about what was worth keeping. Read more at [andrewmaynard.net](https://andrewmaynard.net) and on [The Future of Being Human](https://www.futureofbeinghuman.com/).
- **Claude** (Anthropic) — research, game design, code, art, music, and testing.
- The whiteboard aesthetic is an homage to [Risk Bites](https://www.youtube.com/riskbites).

*Built as an experiment in whether play can carry ideas.*
