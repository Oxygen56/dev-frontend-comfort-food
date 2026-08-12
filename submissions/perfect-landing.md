---
title: "The Home Ratio: Tune a Bowl, Keep a Memory Card"
published: true
description: "An accessible three-step ritual that turns one tomato-and-egg preference into a private, copyable memory card."
tags: devchallenge, frontendchallenge, webdev, javascript
cover_image: https://oxygen56.github.io/dev-frontend-comfort-food/assets/perfect-landing-cover.png
---

_This is a submission for [Frontend Challenge - Comfort Food Edition, Perfect Landing](https://dev.to/challenges/frontend-2026-07-29)_

## What I built

**The Home Ratio** is a landing-page experience for a simple idea: recipes record steps, but ratios can leave room for people.

The page begins with one culturally specific dish—番茄炒蛋, tomato and egg—without declaring one definitive version. Its centerpiece is a three-step ritual:

1. tune a keyboard-native ratio between soft egg and bright tomato;
2. place the bowl in a weeknight glow, rain-window quiet, or an unhurried Sunday;
3. optionally keep one private word for a person, place, or season.

The page seals those choices into an original memory card and a copyable sentence. The page does not store or send the optional word: there is no account, network request, cookie, browser storage, or analytics endpoint. It reaches the device clipboard only when the visitor explicitly chooses Copy.

The result is not a recipe calculator. It is a small interaction that gives an unwritten preference a shape worth keeping.

## Demo

![A short silent tour from native ratio dial to private browser-made memory card](https://oxygen56.github.io/dev-frontend-comfort-food/assets/perfect-landing-demo.gif)

{% embed https://oxygen56.github.io/dev-frontend-comfort-food/perfect-landing/ %}

- [Open the live Perfect Landing experience](https://oxygen56.github.io/dev-frontend-comfort-food/perfect-landing/)
- [Read the source](https://github.com/Oxygen56/dev-frontend-comfort-food/tree/main/docs/perfect-landing)

## Journey

### The interaction model

I used a real HTML range input rather than a simulated drag surface. That decision gives the centerpiece keyboard, touch, and assistive-technology behavior by default. Arrow keys change the ratio in five-point steps, while a polite live region announces the new balance. A synchronized mini-bowl keeps the visual response in the same viewport as the control.

The three moment choices are native radio inputs, and the optional word is handled as text—not HTML. Submitting moves focus to the completed card; copying produces the same visible sentence. JavaScript only enables the enhanced experience after initialization succeeds. If JavaScript is disabled or the application file fails to load, the interactive maker is replaced by three complete ratio portraits plus the full moment guide.

### Design system

The visual language comes from the dish itself: tomato red, egg yellow, enamel blue-green, warm paper, and dark brown ink. Every hero ingredient is a browser-native shape built from gradients, borders, radii, and transforms. System fonts keep the experience fast and free of external rights or availability risk.

The page was designed and tested for:

- complete keyboard access and highly visible focus;
- 320 px reflow without horizontal scrolling;
- `prefers-reduced-motion`;
- complete no-JavaScript and failed-script paths;
- local-only personalization with no storage or external requests;
- WCAG A/AA automated checks;
- zero external runtime requests;
- final verification in Chromium, Firefox, and WebKit, including a slow-connection path.

### AI assistance and rights

OpenAI Codex was used as the primary implementation assistant for research synthesis, interaction prototyping, HTML/CSS/JavaScript development, test authoring, and technical-writing support. The author directed the concept and acceptance criteria. Final review covered the source, behavior, accessibility evidence, third-party-rights status, and public claims.

All artwork and copy are original to this entry. The screenshots and silent demo are direct recordings of that original browser-rendered work. No AI-generated media or third-party visual, font, text, brand mark, API, or dataset is included.
