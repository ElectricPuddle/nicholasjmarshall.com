import { expect, test } from '@playwright/test';

async function minDimension(page, selector) {
  const box = await page.locator(selector).boundingBox();
  if (!box) return { width: 0, height: 0 };
  return { width: box.width, height: box.height };
}

test('Navigation and CTAs have accessible tap sizes', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 1200 });
  await page.goto('/index.html');

  const navLinks = page.locator('nav a');
  const count = await navLinks.count();
  for (let index = 0; index < count; index += 1) {
    const dims = await minDimension(page, `nav a >> nth=${index}`);
    expect(dims.width).toBeGreaterThanOrEqual(44);
    expect(dims.height).toBeGreaterThanOrEqual(44);
  }

  const primaryButton = await minDimension(page, '.button.primary');
  expect(primaryButton.width).toBeGreaterThanOrEqual(44);
  expect(primaryButton.height).toBeGreaterThanOrEqual(44);

  const emailLink = await minDimension(page, 'a[href^="mailto:"]');
  expect(emailLink.width).toBeGreaterThanOrEqual(44);
  expect(emailLink.height).toBeGreaterThanOrEqual(44);
});
