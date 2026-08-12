# The Home Ratio / 家的比例

Two original entries for the [DEV Frontend Challenge: Comfort Food](https://dev.to/challenges/frontend-2026-07-29), built around one observation: one tomato-and-egg dish can open into several different remembered ratios.

## Entries

- **[CSS Art](https://oxygen56.github.io/dev-frontend-comfort-food/css-art/):** a pure HTML/CSS two-act artwork. Three ratios redraw an entire remembered room; serving the table reveals steam and a second place setting. No JavaScript, SVG, canvas, imported images, web fonts, or third-party code. [DEV submission](https://dev.to/oxygen56/the-home-ratio-a-pure-css-serving-ritual-5268).
- **[Perfect Landing](https://oxygen56.github.io/dev-frontend-comfort-food/perfect-landing/):** a progressive-enhancement memory-card maker. Tune a keyboard-native ratio, choose a moment, and optionally add one local-only word. The complete guide remains when JavaScript is unavailable or fails to load. [DEV submission](https://dev.to/oxygen56/the-home-ratio-a-landing-page-tuned-by-memory-1af9).

Open the [two-entry demo hub](https://oxygen56.github.io/dev-frontend-comfort-food/), or serve the `docs` directory with any static server.

## Verification

```bash
npm install
npm test
```

The release suite checks the judge hub and both entries in Chromium, Firefox, and WebKit, including desktop and mobile accessibility scans, 320 px reflow, keyboard interaction, whole-room CSS state changes, the complete memory-card ritual, input safety and privacy, slow connections, reduced motion, no-JavaScript and failed-script fallbacks, and local-only assets. Visual captures run separately with `npm run evidence:capture` so ordinary tests stay read-only.

## Judge path

The [two-entry demo hub](https://oxygen56.github.io/dev-frontend-comfort-food/) gives each track an independent live preview, entry link, DEV submission, and concise evidence map. Detailed verification is recorded in [`reports/acceptance.md`](reports/acceptance.md).

## Rights and AI disclosure

All shipped visuals and copy are original to this project. The pages use only native HTML, CSS, JavaScript, and system fonts. OpenAI Codex was used as the primary implementation assistant. The author directed the concept and acceptance criteria; final review covered source, accessibility behavior, rights status, and submission claims. See `ATTRIBUTION.md` and `AI_DISCLOSURE.md`.

## Deadline control

- Official: 2026-08-16 23:59 PDT (2026-08-17 14:59 Beijing)
- DEV component risk time: approximately 2026-08-17 07:59:59 Beijing
- Internal freeze: 2026-08-17 07:00 Beijing
