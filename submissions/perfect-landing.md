---
title: "The Home Ratio: A Landing Page Tuned by Memory"
published: true
description: "A tactile, accessible landing page where one tomato-and-egg dish makes room for every home's remembered ratio."
tags: devchallenge, frontendchallenge, webdev, javascript
cover_image: https://oxygen56.github.io/dev-frontend-comfort-food/assets/perfect-landing-cover.png
---

_This is a submission for [Frontend Challenge - Comfort Food Edition, Perfect Landing](https://dev.to/challenges/frontend-2026-07-29)_

## What I built

**The Home Ratio** is a landing-page experience for a simple idea: recipes record steps, but ratios can record people.

The page begins with one culturally specific dish—番茄炒蛋, tomato and egg—without declaring one definitive version. Its signature ratio dial moves between soft egg and bright tomato. As it moves, the ingredient composition, numeric ratio, emotional name, description, live-region announcement, and shareable memory line answer together.

The result is not a recipe calculator. It is an invitation to notice the version you already carry.

## Demo

![A short silent tour of the native ratio dial changing the memory and bowl](https://oxygen56.github.io/dev-frontend-comfort-food/assets/perfect-landing-demo.gif)

{% embed https://oxygen56.github.io/dev-frontend-comfort-food/perfect-landing/ %}

- [Open the live Perfect Landing experience](https://oxygen56.github.io/dev-frontend-comfort-food/perfect-landing/)
- [Read the source](https://github.com/Oxygen56/dev-frontend-comfort-food/tree/main/docs/perfect-landing)

## Journey

### The interaction model

I used a real HTML range input rather than a simulated drag surface. That decision gives the centerpiece keyboard, touch, and assistive-technology behavior by default. Arrow keys change the ratio in five-point steps, while a polite live region announces the new balance.

JavaScript performs one progressive-enhancement job: it keeps the CSS composition and the editorial copy synchronized with the native input. With JavaScript disabled, the interactive card is replaced by three complete ratio portraits, and every narrative section remains available.

### Design system

The visual language comes from the dish itself: tomato red, egg yellow, enamel blue-green, warm paper, and dark brown ink. Every hero ingredient is a browser-native shape built from gradients, borders, radii, and transforms. System fonts keep the experience fast and free of external rights or availability risk.

The page was designed and tested for:

- complete keyboard access and highly visible focus;
- 320 px reflow without horizontal scrolling;
- `prefers-reduced-motion`;
- a complete no-JavaScript path;
- WCAG A/AA automated checks;
- zero external runtime requests;
- final verification in Chromium, Firefox, and WebKit, including a slow-connection path.

### AI assistance and rights

OpenAI Codex was used as the primary implementation assistant for research synthesis, interaction prototyping, HTML/CSS/JavaScript development, test authoring, and technical-writing support. A human directed the concept and acceptance criteria and reviewed the final source, behavior, accessibility evidence, third-party-rights status, and public claims.

All shipped visuals and copy are original to this entry. No generated media or third-party visual, font, text, brand mark, API, or dataset is included.
