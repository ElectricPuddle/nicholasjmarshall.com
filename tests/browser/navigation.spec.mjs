import { expect, test } from '@playwright/test';

const pages = ['index.html', 'about.html', 'journey.html'];

for (const currentPage of pages) {
  test(`${currentPage} navigation updates the correct page and aria-current`, async ({ page }) => {
    await page.goto(`/${currentPage}`);
    for (const target of pages) {
      const link = page.locator(`header nav a[href="${target}"]`);
      if (await link.count()) {
        await link.click();
        await expect(page).toHaveURL(new RegExp(`${target}$`));
        const current = await page.locator(`header nav a[href="${target}"][aria-current="page"]`).count();
        expect(current).toBe(1);
        await page.goto(`/${currentPage}`);
      }
    }
  });
}
