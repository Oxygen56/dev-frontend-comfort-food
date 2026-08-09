# Acceptance evidence

Final local gate: **14/14 automated browser checks passed** on 2026-08-10 Asia/Shanghai.

| Requirement | CSS Art | Perfect Landing | Evidence |
|---|---:|---:|---|
| Independently addressable public-ready page | yes | yes | `docs/css-art/`, `docs/perfect-landing/` |
| Signature interaction | ratio radios + lid ritual | native ratio dial | keyboard interaction tests |
| Complete keyboard operation | yes | yes | Playwright focus, arrow, and Space tests |
| 320 px reflow | yes | yes | overflow assertions + full-page captures |
| Reduced motion | yes | yes | emulated preference; all durations ≤ 1 ms |
| No-JavaScript path | native by construction | complete three-ratio fallback | script count + JS-disabled browser context |
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
npx playwright install chromium
npm test
```

The final run is recorded locally by the competition workspace at `20260810-015152_final-local-gate` with score `1` for the binary acceptance metric `judge-confidence`.
