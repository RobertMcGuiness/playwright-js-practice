// Test: Login test with valid user name and password 

// 1. Go to login page
// 2. Enter valid login information 
// 3. Verify login page is displayed

import { test as base, expect } from '@playwright/test';

const test = base.extend({
  storageState: undefined, // Ignore global storageState for this test
});

test('Login and check that successful', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.getByRole('textbox', { name: /username/i }).fill('performance_glitch_user');
  await page.getByRole('textbox', { name: /password/i }).fill('secret_sauce');
  await page.getByRole('button', { name: /login/i }).click();

  //Assert login successful
await expect(page.getByText('Products')).toBeVisible();
});