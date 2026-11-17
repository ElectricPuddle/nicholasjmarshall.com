import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests/browser',
  reporter: 'list',
  use: {
    baseURL: 'http://127.0.0.1:4173',
    browserName: 'chromium',
    headless: true,
  },
  webServer: {
    command: 'npx http-server . -p 4173 -s',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: true,
    timeout: 120000,
  },
});
