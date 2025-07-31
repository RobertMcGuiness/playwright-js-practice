// Test: Purchase all items under $16, verify cart and totals, complete checkout, and log out

// 1. Login using config (global storage state)
// 2. Add all items under $16 to cart
// 3. Check cart badge matches number of items
// 4. Open cart, verify items, and proceed to checkout
// 5. Enter random name and zip, verify item total matches sum of selected items
// 6. Finish checkout and check for thank you message
// 7. Log out

import { test, expect } from '@playwright/test';

function randomString(length) {
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

  const firstName = randomString(5);
  const lastName = randomString(8);
  const zipcode = 'T2H 0K8';

test('Purchase all items under $16 and verify cart/checkout', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/inventory.html');
  await expect(page.getByText('Products')).toBeVisible();

  // Find all items under $16 and add to cart
  const itemCards = page.locator('.inventory_item');
  const count = await itemCards.count();
  let addedIndexes = [];
  let selectedTotal = 0;
  for (let i = 0; i < count; i++) {
    const priceText = await itemCards.nth(i).locator('.inventory_item_price').textContent();
    const price = parseFloat(priceText.replace('$', ''));
    if (price < 16) {
      await itemCards.nth(i).getByRole('button', { name: /add to cart/i }).click();
      addedIndexes.push(i);
      selectedTotal += price;
    }
  }

  // Check cart badge matches number of items added
  const cartBadge = page.locator('.shopping_cart_badge');
  await expect(cartBadge).toHaveText(String(addedIndexes.length));

  // Go to cart and verify items
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page.getByText('Your Cart')).toBeVisible();
  const cartItems = page.locator('.cart_item');
  await expect(cartItems).toHaveCount(addedIndexes.length);

  // Checkout
  await page.getByRole('button', { name: /checkout/i }).click();
  await expect(page.getByText('Checkout: Your Information')).toBeVisible();
  await page.getByRole('textbox', { name: /first name/i }).fill(firstName);
  await page.getByRole('textbox', { name: /last name/i }).fill(lastName);
  await page.getByRole('textbox', { name: /zip|postal/i }).fill(zipcode);
  await page.getByRole('button', { name: /continue/i }).click();


  // Verify item total matches sum of selected items
  const itemTotalText = await page.locator('.summary_subtotal_label').textContent();
  const itemTotal = parseFloat(itemTotalText.replace('Item total: $', ''));
  expect(itemTotal).toBeCloseTo(selectedTotal, 2);
 

  // Check and store the tax amount
  const taxText = await page.locator('.summary_tax_label').textContent();
  const tax = parseFloat(taxText.replace('Tax: $', ''));

  // Check that item total + tax matches the displayed total
  const totalText = await page.locator('.summary_total_label').textContent();
  const displayedTotal = parseFloat(totalText.replace('Total: $', ''));
  expect(displayedTotal).toBeCloseTo(itemTotal + tax, 2);
  const timestamp1 = Date.now();
  await page.screenshot({ path: `screenshots/checkout-total-${timestamp1}.png`, fullPage: true });

  // Finish checkout
  await page.getByRole('button', { name: /finish/i }).click();
  await expect(page.getByText(/thank you for your order/i)).toBeVisible();

  // Log out
  await page.locator('#react-burger-menu-btn').click();
  await page.locator('#logout_sidebar_link').waitFor({ state: 'visible' });
  await page.locator('#logout_sidebar_link').click();
  await expect(page.getByRole('button', { name: /login/i })).toBeVisible();
});