---
title: "The Home Ratio: A Pure-CSS Serving Ritual"
published: true
description: "Three remembered rooms, two native controls, one place kept at the table—drawn entirely with HTML and CSS."
tags: frontendchallenge, devchallenge, css
cover_image: https://oxygen56.github.io/dev-frontend-comfort-food/assets/css-art-cover.png
---

_This is a submission for [Frontend Challenge - Comfort Food Edition, CSS Art](https://dev.to/challenges/frontend-2026-07-29)._

## Inspiration

**The Home Ratio** is an interactive CSS artwork about 番茄炒蛋—tomato and egg—and the small differences that let one familiar dish hold several remembered rooms.

Choose one of three balances: a bright 60:40 window, a shared 50:50 table, or a soft 40:60 morning. The same CSS-drawn kitchen recomposes itself—ingredients, sauce, wall light, window weather, clock, table textile, and handwritten note move as one scene.

Then use a second native control to serve the table. The lid lifts, steam rises, and another rice bowl slides into view. The final image is not just a dish; it is a place kept for someone.

There is no “authentic” winning ratio. The interaction is the point: a shared dish can hold several equally valid memories.

## Demo

![A short silent tour of three remembered rooms and the CSS-drawn table reveal](https://oxygen56.github.io/dev-frontend-comfort-food/assets/css-art-demo.gif)

{% embed https://oxygen56.github.io/dev-frontend-comfort-food/css-art/ %}

- [Open the live CSS Art experience](https://oxygen56.github.io/dev-frontend-comfort-food/css-art/)
- [Read the source](https://github.com/Oxygen56/dev-frontend-comfort-food/tree/main/docs/css-art)

## Journey

### How I drew it

The artwork uses only HTML and CSS:

- radio inputs drive three whole-room compositions;
- a checkbox drives the lid, steam, and second-place-setting reveal;
- gradients make the sauce, ceramic, changing window light, weather, wall glow, rice, textile, and wood grain;
- borders, border radii, transforms, and pseudo-elements draw every ingredient;
- CSS custom properties let one composition rebalance tomato and egg and retune the room without duplicating the artwork.

There is no JavaScript, SVG, canvas, image, icon library, external font, or runtime dependency.

### Accessibility and resilience

The controls are native form elements with visible labels and high-contrast focus rings. The complete piece works with touch, mouse, Tab, arrow keys, and Space. It reflows without horizontal scrolling at 320 px, and `prefers-reduced-motion` reduces every animation and transition to an effectively static state.

The repository includes automated browser checks for keyboard operation, 320 px reflow, slow connections, reduced motion, external requests, console errors, and WCAG A/AA issues with axe-core. The final judge simulation passed across Chromium, Firefox, and WebKit.

### AI assistance and rights

OpenAI Codex was used as the primary implementation assistant for research synthesis, interaction prototyping, HTML/CSS development, test authoring, and technical-writing support. A human directed the concept and acceptance criteria and reviewed the final source, behavior, accessibility evidence, third-party-rights status, and public claims.

All artwork and copy are original to this entry. The screenshots and silent demo are direct recordings of that original browser-rendered work. No generated media or third-party visual, font, text, brand mark, API, or dataset is included.
