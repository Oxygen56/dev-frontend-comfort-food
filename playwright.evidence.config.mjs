import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: '**/visual-evidence.spec.mjs',
  timeout: 20_000,
  workers: 1,
  outputDir: '/tmp/dev-comfort-evidence-results',
  reporter: [['list']],
  use: {
    baseURL: 'http://127.0.0.1:43217',
    ...devices['Desktop Chrome'],
  },
  webServer: {
    command: 'npm run serve',
    port: 43217,
    reuseExistingServer: true,
  },
});
