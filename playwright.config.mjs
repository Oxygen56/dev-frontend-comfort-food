import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 20_000,
  workers: 4,
  outputDir: './reports/test-results',
  reporter: [['list'], ['html', { outputFolder: 'reports/playwright-report', open: 'never' }]],
  use: {
    baseURL: 'http://127.0.0.1:43217',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    ...devices['Desktop Chrome'],
  },
  webServer: {
    command: 'npm run serve',
    port: 43217,
    reuseExistingServer: true,
  },
});
