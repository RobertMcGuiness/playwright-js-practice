// Test: Register a new user with random details, verify account creation, and then delete the account.

// 1. Go to registration page
// 2. Fill out registration form with random details
// 3. Verify account creation
// 4. Delete the account

import { test, expect } from '@playwright/test';

function randomString(length) {
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

  const username = 'User_' + randomString(2);
  const password = randomString(8);
  const email = `user_${randomString(4)}@test.com`;
  const firstName = randomString(5);
  const lastName = randomString(8);
  const company = randomString(4) +' Ltd.';
  const address1 = '1 ' + randomString(4) +' Street';
  const address2 = 'Metropolis';
  const state = 'Alberta';
  const city = 'Calgary';
  const zipcode = 'T2H 0K8';
  const mobile = '07' + Math.floor(100000000 + Math.random() * 900000000).toString();


test('Register a new user with random name and email, then delete them', async ({ page }) => {
  await page.goto('https://automationexercise.com/');

  // Accept consent if present
  const consentButton = page.getByRole('button', { name: /consent/i });
  if (await consentButton.isVisible().catch(() => false)) {
    await consentButton.click();
  }

  // Click Signup / Login
  await page.getByRole('link', { name: /signup|login/i }).click();

  // Fill signup form
  await expect(page.locator('#form')).toContainText('New User Signup!');
  await page.getByRole('textbox', { name: 'Name' }).fill(username);
  await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill(email);
  await page.getByRole('button', { name: 'Signup' }).click();

  // Fill account info
  await expect(page.locator('#form')).toContainText('Enter Account Information');
  await page.getByRole('radio', { name: /mr\./i }).check();
  await page.getByRole('textbox', { name: /password/i }).fill(password);
  await page.locator('#days').selectOption('13');
  await page.locator('#months').selectOption('12');
  await page.locator('#years').selectOption('1979');
  await page.getByRole('checkbox', { name: /newsletter/i }).check();
  await page.getByRole('checkbox', { name: /special offers/i }).check();
  await page.getByRole('textbox', { name: /first name/i }).fill(firstName);
  await page.getByRole('textbox', { name: /last name/i }).fill(lastName);
  await page.getByRole('textbox', { name: /^company$/i }).fill(company );
  await page.getByRole('textbox', { name: /address \*/i }).fill(address1);
  await page.getByRole('textbox', { name: /address 2/i }).fill(address2);
  await page.getByLabel('Country *').selectOption('Canada');
  await page.getByRole('textbox', { name: /state/i }).fill(state);
  await page.getByRole('textbox', { name: /city/i }).fill(city);
  await page.locator('#zipcode').fill(zipcode);
  await page.getByRole('textbox', { name: /mobile/i }).fill(mobile);
  await page.getByRole('button', { name: /create account/i }).click();

  // Assert account created
  await expect(page.locator('b')).toContainText('Account Created!');
  await page.getByRole('link', { name: /continue/i }).click();

  // Delete the account
  await expect(page.locator('#header')).toContainText('Logged in as ' + username);
  await page.getByRole('link', { name: 'Delete Account' }).dblclick();
  await expect(page.locator('b')).toContainText('Account Deleted!');
});