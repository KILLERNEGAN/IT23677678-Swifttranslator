const { test, expect } = require('@playwright/test');

test('Pos_Fun_0001 - Simple sentence conversion', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');

  // Type Singlish
  await page.fill('textarea[placeholder="Input Your Singlish Text Here."]', 'mama gedhara yanavaa.');

  // Wait for output to update
  const outputBox = page.locator('div.whitespace-pre-wrap');
  await expect(outputBox).toContainText('මම');

});
