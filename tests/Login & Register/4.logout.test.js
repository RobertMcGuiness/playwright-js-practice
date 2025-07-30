// Test: Logout functionality

// 1. Use global login to access the inventory page
// 2. Click the menu and then logout
// 3. Verify that the login screen is displayed

import { test, expect } from '@playwright/test';

test('Logout returns user to login screen', async ({ page }) => {
  // Go to the inventory page (should be logged in via global setup)
  await page.goto('https://www.saucedemo.com/inventory.html');
  await expect(page.getByText('Products')).toBeVisible();


  // Open the menu and click logout using correct selectors
  await page.locator('#react-burger-menu-btn').click();
  await page.locator('#logout_sidebar_link').waitFor({ state: 'visible' });
  await page.locator('#logout_sidebar_link').click();

  // Assert that the login screen is displayed
  await expect(page.getByRole('button', { name: /login/i })).toBeVisible();
  await expect(page.getByRole('textbox', { name: /username/i })).toBeVisible();
});