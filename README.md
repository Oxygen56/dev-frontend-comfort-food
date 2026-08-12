# The Home Ratio / 家的比例

Two original entries for the [DEV Frontend Challenge: Comfort Food](https://dev.to/challenges/frontend-2026-07-29), built around one observation: tomato and egg can be the same dish in every home and still carry a different remembered ratio.

## Entries

- **[CSS Art](https://oxygen56.github.io/dev-frontend-comfort-food/css-art/):** a pure HTML/CSS serving ritual. Choose tomato-led, balanced, or egg-led; then lift the lid. No JavaScript, SVG, canvas, images, web fonts, or third-party code. [DEV submission](https://dev.to/oxygen56/the-home-ratio-a-pure-css-serving-ritual-5268).
- **[Perfect Landing](https://oxygen56.github.io/dev-frontend-comfort-food/perfect-landing/):** a progressive-enhancement landing page with a keyboard-native ratio dial. JavaScript makes the bowl and copy respond; the complete story and three ratios remain available without it. [DEV submission](https://dev.to/oxygen56/the-home-ratio-a-landing-page-tuned-by-memory-1af9).

Open the [two-entry demo hub](https://oxygen56.github.io/dev-frontend-comfort-food/), or serve the `docs` directory with any static server.

## Verification

```bash
npm install
npm test
```

The suite checks the judge hub and both entries in Chromium, Firefox, and WebKit, including automated accessibility scans, 320 px reflow, keyboard interaction, slow-connection behavior, reduced-motion behavior, no-JavaScript fallback, and local-only assets. The final post-publication gate passed **57/57 checks**.

## Judge path

The [two-entry demo hub](https://oxygen56.github.io/dev-frontend-comfort-food/) gives each track an independent live preview, entry link, DEV submission, and concise evidence map. Detailed verification is recorded in [`reports/acceptance.md`](reports/acceptance.md).

## Rights and AI disclosure

All shipped visuals and copy are original to this project. The pages use only native HTML, CSS, JavaScript, and system fonts. OpenAI Codex was used as the primary implementation assistant under human direction and review; the final source, accessibility behavior, rights status, and submission claims were reviewed for this entry. See `ATTRIBUTION.md` and `AI_DISCLOSURE.md`.

## Deadline control

- Official: 2026-08-16 23:59 PDT (2026-08-17 14:59 Beijing)
- DEV component risk time: approximately 2026-08-17 07:59:59 Beijing
- Internal freeze: 2026-08-17 07:00 Beijing
