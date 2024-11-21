import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  globalSetup: 'globalSetup.js',
  timeout: process.env.CI ? 40 * 1000 : 60 * 1000,
  testDir: 'tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : 1,
  run_headless: process.env.HEADLESS,
  reporter: [["line"], ["allure-playwright",
    {
      detail: false,
      mode: 'minimal',
      outputFolder: 'allure-results',
      suiteTitle: true,
      environmentInfo: {
        node_version: process.version,
        run_trace: true,
        run_headless: process.env.HEADLESS
      },
    },
  ]
  ],
  use: {
    baseURL: 'https://dev.topklik.online/',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
  ],
});
