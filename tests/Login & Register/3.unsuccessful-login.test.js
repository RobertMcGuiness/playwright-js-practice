// Test: Login test with invalid user name or password 

// 1. Go to login page
// 2. Enter invalid login information 
// 3. Verify error messages displayed

import { test as base, expect } from '@playwright/test';

const test = base.extend({
  storageState: undefined, // Ignore global storageState for this test
});

//Incorrect password
test('Invalid password and check that unsuccessful', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.getByRole('textbox', { name: /username/i }).fill('performance_glitch_user');
  await page.getByRole('textbox', { name: /password/i }).fill('secret_ sauce');
  await page.getByRole('button', { name: /login/i }).click();

  //Assert login unsuccessful and correct error message displayed
await expect(page.getByText(/Epic sadface: Username and password do not match any user/i)).toBeVisible();
  const timestamp1 = Date.now();
  await page.screenshot({ path: `screenshots/invalid-password-error-${timestamp1}.png` });
});

//Unsuccessful Login to a successful  
test('Invalid username and check that unsuccessful', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.getByRole('textbox', { name: /username/i }).fill('invalid_user');
  await page.getByRole('textbox', { name: /password/i }).fill('secret_sauce');
  await page.getByRole('button', { name: /login/i }).click();

  //Assert login unsuccessful and correct error message displayed  
    await expect(page.getByText(/Epic sadface: Username and password do not match any user/i)).toBeVisible();
  const timestamp2 = Date.now();
  await page.screenshot({ path: `screenshots/invalid-username-error-${timestamp2}.png` });
});