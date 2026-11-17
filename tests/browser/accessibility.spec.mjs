import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const pages = ['index.html', 'about.html', 'journey.html'];
const widths = [360, 1280];

for (const page of pages) {
  for (const width of widths) {
    test(`${page} passes automated accessibility checks at ${width}px`, async ({ page: browserPage }) => {
      await browserPage.setViewportSize({ width, height: 1200 });
      await browserPage.goto(`/${page}`);
      const results = await new AxeBuilder({ page: browserPage }).withTags([
        'wcag2a',
        'wcag2aa',
        'wcag21a',
        'wcag21aa',
        'wcag22aa',
      ]).analyze();
      expect(results.violations).toEqual([]);
    });
  }
}
