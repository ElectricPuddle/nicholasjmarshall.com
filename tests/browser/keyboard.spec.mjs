import { expect, test } from '@playwright/test';

const pages = ['index.html', 'about.html', 'journey.html'];

function isVisibleFocusIndicator(style) {
  return style.outlineStyle !== 'none' || Number(style.outlineWidth) > 0 || style.boxShadow !== 'none';
}

test.describe('keyboard accessibility', () => {
  for (const page of pages) {
    test(`${page} focuses the skip link first and shows a visible focus ring`, async ({ page: browserPage }) => {
      await browserPage.goto(`/${page}`);
      await browserPage.keyboard.press('Tab');
      const activeId = await browserPage.evaluate(() => document.activeElement?.id || '');
      expect(activeId).toContain('');
      const firstFocus = await browserPage.evaluate(() => {
        const active = document.activeElement;
        if (!active) return null;
        const style = window.getComputedStyle(active);
        return {
          tag: active.tagName.toLowerCase(),
          className: active.className,
          outlineStyle: style.outlineStyle,
          outlineWidth: style.outlineWidth,
          boxShadow: style.boxShadow,
        };
      });
      expect(firstFocus?.tag).toBe('a');
      expect(isVisibleFocusIndicator(firstFocus)).toBeTruthy();

      const focusables = await browserPage.locator('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])').count();
      for (let i = 0; i < Math.min(focusables, 8); i += 1) {
        await browserPage.keyboard.press('Tab');
        const focusStyles = await browserPage.evaluate(() => {
          const active = document.activeElement;
          if (!active || active === document.body) return null;
          const style = window.getComputedStyle(active);
          return {
            outlineStyle: style.outlineStyle,
            outlineWidth: style.outlineWidth,
            boxShadow: style.boxShadow,
          };
        });
        if (focusStyles) {
          expect(isVisibleFocusIndicator(focusStyles)).toBeTruthy();
        }
      }
    });
  }
});
