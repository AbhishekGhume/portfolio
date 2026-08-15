/**
 * @file playwright.config.js
 * @copyright © 2025 Abhishek. All rights reserved.
 * @author Abhishek
 * @description End-to-end (Playwright) test harness.
 */
import { defineConfig, devices } from '@playwright/test';

// E2E: build the site, serve the production bundle, drive it in a real browser.
export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['list']] : 'list',
  use: {
    // Trailing base path matches vite.config.js `base: '/portfolio/'` — the
    // preview server serves the site under it, so page.goto('/') without this
    // would land on a 404 outside the app.
    baseURL: 'http://127.0.0.1:4173/portfolio/',
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'npm run build && npm run preview -- --port 4173 --host 127.0.0.1',
    url: 'http://127.0.0.1:4173/portfolio/',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
