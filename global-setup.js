// Login in for SauceLabs
const { chromium } = require('@playwright/test');
const fs = require('fs');

module.exports = async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://www.saucedemo.com/');
  await page.getByRole('textbox', { name: /username/i }).fill('standard_user');
  await page.getByRole('textbox', { name: /password/i }).fill('secret_sauce');
  await page.getByRole('button', { name: /login/i }).click();
  await page.waitForURL('**/inventory.html');
  // Save authentication state
  await page.context().storageState({ path: 'auth/state.json' });
  await browser.close();
};
