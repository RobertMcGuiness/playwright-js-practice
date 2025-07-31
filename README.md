
# Playwright E2E & API Test Suite

This repository contains automated end-to-end and API tests using [Playwright](https://playwright.dev/).

## Test Summary

### UI Tests
- **Register User** (`tests/Login & Register/1.register-user.test.js`): Registers a new user with random details on [automationexercise.com](https://automationexercise.com), verifies account creation, and deletes the account.
- **Successful Login** (`tests/Login & Register/2.successful-login.test.js`): Logs in to [saucedemo.com](https://www.saucedemo.com/) with valid credentials and verifies login.
- **Unsuccessful Login** (`tests/Login & Register/3.unsuccessful-login.test.js`): Attempts to log in to saucedemo.com with invalid credentials and asserts the correct error message. Takes a screenshot of the error state for debugging.
- **Logout** (`tests/Login & Register/4.logout.test.js`): Logs in to saucedemo.com, logs out via the menu, and verifies that the user is returned to the login screen.
- **Purchase All Items Under $16** (`tests/Purchases & Checkout/1.purchase-multiple items.test.js`): Logs in, adds all items under $16 to the cart, verifies cart and totals, completes checkout, and logs out.

### API Tests
- **User Lifecycle Test** (`tests/API/1,basic-API.test.js`):
  - [View API in browser](https://mockapi.io/projects/688b6f6a2a52cabb9f51b8d0)
  - [Direct API endpoint](https://688b6f6a2a52cabb9f51b8cf.mockapi.io/api/rm/v1/users)
  - Generates a random user, checks user count, POSTs the user, verifies the count increases, then deletes the user and checks the count returns to original.

## Structure
- UI tests: `tests/Login & Register/` and `tests/Purchases & Checkout/`
- API tests: `tests/API/`
- Screenshots for failed login attempts: `screenshots/`
- Authentication state is managed using Playwright's global setup for efficient test execution.

## How to Run
1. Install dependencies:
   ```sh
   npm install
   ```
2. Run all tests:
   ```sh
   npx playwright test
   ```
3. Run a specific test:
   ```sh
   npx playwright test tests/API/1,basic-API.test.js
   ```
4. Debug a test:
   ```sh
   npx playwright test --debug
   ```

## Notes
- Tests use accessibility best practices, preferring `getByRole` for element selection.
- Screenshots are timestamped for easy tracking.
- Make sure to update credentials and URLs as needed for your environment.
