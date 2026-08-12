import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const entries = [
  { name: 'Judge Hub', path: '/' },
  { name: 'CSS Art', path: '/css-art/' },
  { name: 'Perfect Landing', path: '/perfect-landing/' },
];

for (const entry of entries) {
  test(`${entry.name}: loads without console errors or external runtime assets`, async ({ page }) => {
    const errors = [];
    const externalRequests = [];
    page.on('console', message => {
      if (message.type() === 'error') errors.push(message.text());
    });
    page.on('pageerror', error => errors.push(error.message));
    page.on('request', request => {
      const url = new URL(request.url());
      if (!['127.0.0.1', 'localhost'].includes(url.hostname)) externalRequests.push(request.url());
    });

    await page.goto(entry.path);
    await expect(page.locator('h1')).toBeVisible();
    expect(errors).toEqual([]);
    expect(externalRequests).toEqual([]);
  });

  test(`${entry.name}: has no detectable WCAG A/AA violations`, async ({ page }) => {
    await page.goto(entry.path);
    const result = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(result.violations).toEqual([]);
  });

  test(`${entry.name}: reflows at 320px without horizontal overflow`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto(entry.path);
    const dimensions = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
    await expect(page.locator('h1')).toBeVisible();
    const result = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(result.violations).toEqual([]);
  });

  test(`${entry.name}: honors reduced motion`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(entry.path);
    const longest = await page.evaluate(() => {
      const times = [...document.querySelectorAll('*')].flatMap(element => {
        const style = getComputedStyle(element);
        return [...style.animationDuration.split(','), ...style.transitionDuration.split(',')]
          .map(value => value.trim().endsWith('ms') ? parseFloat(value) : parseFloat(value) * 1000)
          .filter(Number.isFinite);
      });
      return Math.max(0, ...times);
    });
    expect(longest).toBeLessThanOrEqual(1);
  });

  test(`${entry.name}: remains understandable on a slow connection`, async ({ page }) => {
    await page.route('**/*', async route => {
      await new Promise(resolve => setTimeout(resolve, 350));
      await route.continue();
    });
    await page.goto(entry.path, { waitUntil: 'domcontentloaded' });
    await expect(page.locator('h1')).toBeVisible({ timeout: 5_000 });
  });
}

test('CSS Art: all signature interactions work from the keyboard with zero JavaScript', async ({ page }) => {
  await page.goto('/css-art/');
  await expect(page.locator('script')).toHaveCount(0);

  const balanced = page.locator('#balanced');
  await balanced.focus();
  await balanced.press('ArrowLeft');
  await expect(page.locator('#tomato-led')).toBeChecked();
  await expect(page.locator('.note-tomato')).toHaveCSS('opacity', '1');

  const lid = page.locator('#serve-warm');
  await lid.focus();
  await lid.press('Space');
  await expect(lid).toBeChecked();
  await expect(page.locator('.open-label')).toBeVisible();
  await expect(page.locator('.waiting-place')).toHaveCSS('opacity', '1');
  await expect(page.locator('.serve-message')).toHaveCSS('opacity', '1');
});

test('CSS Art: every ratio changes the whole remembered room', async ({ page }) => {
  await page.goto('/css-art/');
  const scene = page.locator('.scene');
  const note = page.locator('.memory-note:visible');

  await page.locator('label[for="tomato-led"]').click();
  await expect(page.locator('#tomato-led')).toBeChecked();
  await expect(note).toContainText('bright window');
  const tomatoRoom = await scene.evaluate(element => ({
    background: getComputedStyle(element).backgroundImage,
    sauce: getComputedStyle(element).getPropertyValue('--sauce').trim(),
    table: getComputedStyle(element).getPropertyValue('--table-a').trim(),
  }));

  await page.locator('label[for="egg-led"]').click();
  await expect(page.locator('#egg-led')).toBeChecked();
  await expect(note).toContainText('soft morning');
  const eggRoom = await scene.evaluate(element => ({
    background: getComputedStyle(element).backgroundImage,
    sauce: getComputedStyle(element).getPropertyValue('--sauce').trim(),
    table: getComputedStyle(element).getPropertyValue('--table-a').trim(),
  }));
  expect(eggRoom).not.toEqual(tomatoRoom);
});

test('Perfect Landing: the native dial responds to arrow keys and updates one coherent memory', async ({ page }) => {
  await page.goto('/perfect-landing/');
  const range = page.locator('#ratio');
  await range.focus();
  await range.press('ArrowRight');
  await expect(range).toHaveValue('55');
  await expect(page.locator('#tomato-number')).toHaveText('55');
  await expect(page.locator('#egg-number')).toHaveText('45');
  await expect(page.locator('#ratio-name')).toHaveText('Window-light bright');
  await expect(page.locator('#share-line')).toContainText('55:45');
  await expect(page.locator('#card-tomato')).toHaveText('55');
  await expect(range).toHaveAttribute('aria-valuetext', /55 percent tomato/);
});

test('Perfect Landing: three-step ritual seals a private synchronized memory card', async ({ page }) => {
  const externalRequests = [];
  page.on('request', request => {
    const url = new URL(request.url());
    if (!['127.0.0.1', 'localhost'].includes(url.hostname)) externalRequests.push(request.url());
  });
  await page.goto('/perfect-landing/');
  await page.locator('#ratio').fill('65');
  await page.locator('label[for="moment-sunday"]').click();
  await expect(page.locator('#moment-sunday')).toBeChecked();
  await page.locator('#memory-word').fill('<b>late summer</b>');
  await page.locator('.seal-action').click();
  await expect(page.locator('#memory-card')).toBeFocused();
  await expect(page.locator('#card-tomato')).toHaveText('65');
  await expect(page.locator('#card-moment')).toContainText('Sunday unhurried');
  await expect(page.locator('#card-for')).toHaveText('Kept for <b>late summer</b>.');
  await expect(page.locator('#card-for b')).toHaveCount(0);
  await expect(page.locator('#share-line')).toContainText('65:35');
  expect(externalRequests).toEqual([]);
  const storage = await page.evaluate(() => ({
    local: localStorage.length,
    session: sessionStorage.length,
    cookies: document.cookie,
  }));
  expect(storage).toEqual({ local: 0, session: 0, cookies: '' });
});

test('Perfect Landing: no-JS fallback keeps the complete choice set and content path', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 320, height: 800 } });
  const page = await context.newPage();
  await page.goto('/perfect-landing/');
  await expect(page.locator('.no-js-ratios article')).toHaveCount(3);
  await expect(page.locator('.no-js-ratios')).toBeVisible();
  await expect(page.locator('#why-title')).toBeVisible();
  await expect(page.locator('#copy-ratio')).toBeHidden();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(0);
  await context.close();
});

test('Perfect Landing: blocked application script fails safely to the complete fallback', async ({ page }) => {
  await page.route('**/perfect-landing/app.js', route => route.abort());
  await page.goto('/perfect-landing/');
  await expect(page.locator('html')).toHaveClass(/no-js/);
  await expect(page.locator('.dial-card')).toBeHidden();
  await expect(page.locator('.no-js-ratios')).toBeVisible();
  await expect(page.locator('.no-js-ratios article')).toHaveCount(3);
});

test('Perfect Landing: mobile completion remains inside the viewport with long private text', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto('/perfect-landing/');
  await page.locator('#memory-word').fill('abcdefghijklmnopqrstuvwx');
  await page.locator('.seal-action').click();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(0);
  await expect(page.locator('#memory-card')).toBeFocused();
  const result = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();
  expect(result.violations).toEqual([]);
});

test('Hub links to two independently addressable entries', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('a[href="css-art/"]')).toHaveCount(1);
  await expect(page.locator('a[href="perfect-landing/"]')).toHaveCount(1);
  await expect(page.locator('video')).toHaveCount(2);
  await expect(page.locator('source[src="assets/css-art-demo.mp4"]')).toHaveCount(1);
  await expect(page.locator('source[src="assets/perfect-landing-demo.mp4"]')).toHaveCount(1);
});
