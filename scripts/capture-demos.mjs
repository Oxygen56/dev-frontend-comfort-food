import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const rawDir = path.join(root, 'reports', 'demo-recordings');
const publicDir = path.join(root, 'docs', 'assets');
const baseURL = 'http://127.0.0.1:43217';

await mkdir(rawDir, { recursive: true });
await mkdir(publicDir, { recursive: true });

const browser = await chromium.launch();

async function record(name, route, perform) {
  const context = await browser.newContext({
    viewport: { width: 1000, height: 720 },
    recordVideo: { dir: rawDir, size: { width: 1000, height: 720 } },
    reducedMotion: 'no-preference',
  });
  const page = await context.newPage();
  const video = page.video();

  await page.goto(`${baseURL}${route}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(900);
  await perform(page);
  await page.waitForTimeout(900);
  await context.close();

  const rawPath = await video.path();
  const outputPath = path.join(rawDir, `${name}.webm`);
  await video.saveAs(outputPath);
  return outputPath;
}

const outputs = [];

outputs.push(await record('css-art', '/css-art/', async page => {
  await page.locator('label[for="tomato-led"]').click();
  await page.waitForTimeout(900);
  await page.locator('label[for="balanced"]').click();
  await page.waitForTimeout(900);
  await page.locator('label[for="egg-led"]').click();
  await page.waitForTimeout(900);
  await page.locator('label[for="serve-warm"]').click();
  await page.waitForTimeout(2300);
}));

outputs.push(await record('perfect-landing', '/perfect-landing/', async page => {
  await page.locator('#ratio-lab').scrollIntoViewIfNeeded();
  await page.waitForTimeout(700);
  const range = page.locator('#ratio');
  await range.fill('35');
  await page.waitForTimeout(900);
  await range.fill('50');
  await page.waitForTimeout(900);
  await range.fill('65');
  await page.waitForTimeout(1200);
  await page.locator('#keep').scrollIntoViewIfNeeded();
  await page.waitForTimeout(900);
}));

await browser.close();
console.log(outputs.join('\n'));
