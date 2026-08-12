# Acceptance evidence

Upgraded final release gate: **69/69 automated browser checks passed** on 2026-08-12 Asia/Shanghai across Chromium, Firefox, and WebKit.

| Requirement | CSS Art | Perfect Landing | Evidence |
|---|---:|---:|---|
| Independently addressable public-ready page | yes | yes | `docs/css-art/`, `docs/perfect-landing/` |
| Signature interaction | three whole-room ratios + table reveal | ratio + moment + private word → memory card | complete journey tests |
| Complete keyboard operation | yes | yes | Playwright focus, arrow, and Space tests |
| 320 px reflow | yes | yes | overflow assertions + full-page captures |
| Reduced motion | yes | yes | emulated preference; all durations ≤ 1 ms |
| No-JavaScript path | native by construction | complete three-ratio and moment fallback | script count + JS-disabled browser context |
| Failed-script resilience | not applicable | complete fallback remains visible | blocked `app.js` request test |
| Local-only personalization | not applicable | no cookies, storage, or external requests | private-input journey test |
| Automated accessibility | zero detected WCAG A/AA issues | zero detected WCAG A/AA issues | axe-core Playwright scans |
| No external runtime assets | yes | yes | request interception + source review |
| Console/page errors | zero | zero | runtime listener assertions |
| Rights review | original work only | original work only | `ATTRIBUTION.md` |
| AI disclosure | documented | documented | `AI_DISCLOSURE.md` + both submission drafts |

## Visual evidence

- `reports/screenshots/css-art-desktop.png`
- `reports/screenshots/css-art-320.png`
- `reports/screenshots/perfect-landing-desktop.png`
- `reports/screenshots/perfect-landing-320.png`
- `docs/assets/css-art-cover.png`
- `docs/assets/perfect-landing-cover.png`

## Reproduce

```bash
npm ci
npx playwright install chromium firefox webkit
npm test
npm run evidence:capture
```

The upgraded final release run is recorded locally by the competition workspace at `20260812-184734_core-upgrade-final-release-gate` with score `1` for the binary acceptance metric `judge-confidence`. The ordinary release suite is read-only; visual evidence capture is a separate two-check serial task.

## Publication evidence

Published and publicly verified on 2026-08-12 Asia/Shanghai:

- CSS Art: https://dev.to/oxygen56/the-home-ratio-a-pure-css-serving-ritual-5268
- Perfect Landing: https://dev.to/oxygen56/the-home-ratio-a-landing-page-tuned-by-memory-1af9

Both entries include their intended cover image, official challenge tags and marker, live demo, public source link, AI-assistance disclosure, and third-party-rights statement. Both titles are visible in the public `frontendchallenge` tag feed.

## Post-publication judge simulation and core upgrade

On 2026-08-12 Asia/Shanghai, the published baseline passed **57/57 checks**. A fresh competition audit then showed that the entries were coherent but not yet defensibly the strongest: the CSS state changes were too subtle, while the landing page did not finish with a high-value result.

The core upgrade now gives CSS Art three visibly different remembered rooms plus a second-place-setting reveal, and gives Perfect Landing a private three-step memory-card journey. The release suite expanded to 69 checks covering those states, mobile axe audits, private-input safety, no storage, failed-script fallback, and full cross-browser operation. The current final run is `experiments/runs/20260812-184734_core-upgrade-final-release-gate`.
