import { expect, test } from '@playwright/test';

async function isFullyInsideViewport(page, selector) {
  const box = await page.locator(selector).boundingBox();
  if (!box) return false;
  return box.y >= 0 && box.x >= 0 && box.y + box.height <= page.viewportSize().height && box.x + box.width <= page.viewportSize().width;
}

test('Home content is visible without scrolling on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 640 });
  await page.goto('/index.html');

  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('.lead')).toBeVisible();
  await expect(page.locator('.button.primary')).toBeVisible();
  await expect(page.locator('a[href^="mailto:"]')).toBeVisible();

  expect(await isFullyInsideViewport(page, 'h1')).toBeTruthy();
  expect(await isFullyInsideViewport(page, '.lead')).toBeTruthy();
  expect(await isFullyInsideViewport(page, '.button.primary')).toBeTruthy();
  expect(await isFullyInsideViewport(page, 'a[href^="mailto:"]')).toBeTruthy();
});
