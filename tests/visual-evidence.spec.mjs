import { test, expect } from '@playwright/test';

const captures = [
  { name: 'css-art', path: '/css-art/' },
  { name: 'perfect-landing', path: '/perfect-landing/' },
];

for (const capture of captures) {
  test(`${capture.name}: capture desktop, cover, and 320px evidence`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(capture.path);
    await expect(page.locator('h1')).toBeVisible();
    await page.screenshot({ path: `reports/screenshots/${capture.name}-desktop.png`, fullPage: true });

    await page.setViewportSize({ width: 1000, height: 420 });
    await page.goto(capture.name === 'css-art' ? '/cover-css-art.html' : capture.path);
    await page.screenshot({ path: `docs/assets/${capture.name}-cover.png` });

    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto(capture.path);
    await page.screenshot({ path: `reports/screenshots/${capture.name}-320.png`, fullPage: true });
    if (capture.name === 'css-art') {
      await page.locator('.serve-control').click();
      await expect(page.locator('#serve-warm')).toBeChecked();
      await page.waitForTimeout(800);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({ path: 'reports/screenshots/css-art-320-revealed.png', fullPage: true });
    }
  });
}
