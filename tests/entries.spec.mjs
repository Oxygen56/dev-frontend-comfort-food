import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const entries = [
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

test('Hub links to two independently addressable entries', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: /CSS Art/ })).toHaveAttribute('href', 'css-art/');
  await expect(page.getByRole('link', { name: /Perfect Landing/ })).toHaveAttribute('href', 'perfect-landing/');
});
