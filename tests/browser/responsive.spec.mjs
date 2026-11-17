import { expect, test } from '@playwright/test';

const pages = ['index.html', 'about.html', 'journey.html'];
const widths = [320, 360, 768, 1280];

test.describe('responsive layout', () => {
  for (const page of pages) {
    for (const width of widths) {
      test(`${page} fits at ${width}px wide`, async ({ page: browserPage }) => {
        await browserPage.setViewportSize({ width, height: 1200 });
        await browserPage.goto(`/${page}`);
        const widthOverflow = await browserPage.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);
        expect(widthOverflow).toBeTruthy();
      });
    }
  }
});
