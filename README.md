# Playwright Login & Register Test Suite

This repository contains automated end-to-end tests for login, registration, and authentication flows using [Playwright](https://playwright.dev/).

## Test Summary

- **Register User**: Registers a new user with random details on automationexercise.com, verifies account creation, and deletes the account.
- **Successful Login**: Logs in to saucedemo.com with valid credentials, adds a Sauce Labs Backpack to the cart, and completes the checkout process.
- **Unsuccessful Login**: Attempts to log in to saucedemo.com with invalid credentials (wrong password or username) and asserts that the correct error message is displayed. Takes a screenshot of the error state for debugging.
- **Logout**: Logs in to saucedemo.com, logs out via the menu, and verifies that the user is returned to the login screen.
- **Register With Existing Email**: Attempts to register a user with an email that already exists and verifies the application's response.

## Structure
- All tests are located in the `tests/Login & Register/` directory.
- Screenshots for failed login attempts are saved in the `screenshots/` folder.
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
   npx playwright test tests/Login\ \&\ Register/3.unsuccessful-login.test.js
   ```
4. Debug a test:
   ```sh
   npx playwright test --debug
   ```

## Notes
- Tests use accessibility best practices, preferring `getByRole` for element selection.
- Screenshots are timestamped for easy tracking.
- Make sure to update credentials and URLs as needed for your environment.
