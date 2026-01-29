const { test, expect } = require('@playwright/test');

const URL = 'https://www.swifttranslator.com/';
const inputBox = 'textarea[placeholder="Input Your Singlish Text Here."]';

// Sinhala Unicode range
const sinhalaRegex = /[\u0D80-\u0DFF]/;

async function typeAndWait(page, text) {
  await page.goto(URL);
  await page.fill(inputBox, '');
  await page.type(inputBox, text, { delay: 50 });
  await page.waitForTimeout(3000);
}

// ---------------- POSITIVE FUNCTIONAL ----------------

test('Pos_Fun_0001 - Simple sentence', async ({ page }) => {
  await typeAndWait(page, 'mama gedhara yanavaa.');
  const pageText = await page.textContent('body');
  expect(pageText).toMatch(sinhalaRegex);
});

test('Pos_Fun_0002 - Negative sentence', async ({ page }) => {
  await typeAndWait(page, 'mata heta enna venne naehae.');
  const pageText = await page.textContent('body');
  expect(pageText).toMatch(sinhalaRegex);
});

test('Pos_Fun_0003 - Future tense', async ({ page }) => {
  await typeAndWait(page, 'mama gihin ennam.');
  const pageText = await page.textContent('body');
  expect(pageText).toMatch(sinhalaRegex);
});

// ---------------- NEGATIVE FUNCTIONAL ----------------

test('Neg_Fun_0001 - Joined words robustness', async ({ page }) => {
  await typeAndWait(page, 'mamagedharayanavaa');
  const pageText = await page.textContent('body');
  expect(pageText).toMatch(sinhalaRegex); // system still tries
});

// ---------------- UI ----------------

test('Pos_UI_0001 - Output updates when typing', async ({ page }) => {
  await page.goto(URL);

  await page.type(inputBox, 'mama', { delay: 50 });
  await page.waitForTimeout(2000);
  const first = await page.textContent('body');

  await page.fill(inputBox, '');
  await page.type(inputBox, 'mama gedhara', { delay: 50 });
  await page.waitForTimeout(2000);
  const second = await page.textContent('body');

  expect(first).not.toBe(second);
});
