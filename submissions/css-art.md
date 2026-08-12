---
title: "The Home Ratio: A Pure-CSS Serving Ritual"
published: true
description: "Choose the tomato-and-egg balance you remember, then lift the lid—using only semantic HTML and CSS."
tags: frontendchallenge, devchallenge, css
cover_image: https://oxygen56.github.io/dev-frontend-comfort-food/assets/css-art-cover.png
---

_This is a submission for [Frontend Challenge - Comfort Food Edition, CSS Art](https://dev.to/challenges/frontend-2026-07-29)._

## Inspiration

**The Home Ratio** is an interactive CSS artwork about 番茄炒蛋—tomato and egg—and the small differences that make a familiar dish feel like one particular home.

Choose one of three remembered balances: tomato-led, quietly balanced, or egg-led. The same CSS-drawn bowl recomposes itself: ingredient scale, sauce color, and the handwritten memory note all change. Then lift the lid to serve it warm.

There is no “authentic” winning ratio. The interaction is the point: a shared dish can hold several equally valid memories.

## Demo

![A short silent tour of the ratio choices and the CSS-drawn lid lifting](https://oxygen56.github.io/dev-frontend-comfort-food/assets/css-art-demo.gif)

{% embed https://oxygen56.github.io/dev-frontend-comfort-food/css-art/ %}

- [Open the live CSS Art experience](https://oxygen56.github.io/dev-frontend-comfort-food/css-art/)
- [Read the source](https://github.com/Oxygen56/dev-frontend-comfort-food/tree/main/docs/css-art)

## Journey

### How I drew it

The artwork uses only HTML and CSS:

- radio inputs drive the three compositions;
- a checkbox drives the lid and steam ritual;
- gradients make the sauce, ceramic, window light, and wood grain;
- borders, border radii, transforms, and pseudo-elements draw every ingredient;
- CSS custom properties let one composition rebalance tomato and egg without duplicating the bowl.

There is no JavaScript, SVG, canvas, image, icon library, external font, or runtime dependency.

### Accessibility and resilience

The controls are native form elements with visible labels and strong focus states. The complete piece works with touch, mouse, Tab, arrow keys, Space, and Enter. It reflows without horizontal scrolling at 320 px, and `prefers-reduced-motion` reduces every animation and transition to an effectively static state.

The repository includes automated browser checks for keyboard operation, 320 px reflow, slow connections, reduced motion, external requests, console errors, and WCAG A/AA issues with axe-core. The final judge simulation passed across Chromium, Firefox, and WebKit.

### AI assistance and rights

OpenAI Codex was used as the primary implementation assistant for research synthesis, interaction prototyping, HTML/CSS development, test authoring, and technical-writing support. A human directed the concept and acceptance criteria and reviewed the final source, behavior, accessibility evidence, third-party-rights status, and public claims.

All shipped visuals and copy are original to this entry. No generated media or third-party visual, font, text, brand mark, API, or dataset is included.
