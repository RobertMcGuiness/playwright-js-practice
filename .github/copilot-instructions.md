# Copilot Custom Instruction: Playwright Accessibility

When generating Playwright test code, always use `getByRole` for element selection whenever possible. Prefer accessibility queries over selectors like `getByText`, `locator`, or CSS/XPath. If `getByRole` is not applicable, use the next most accessible query.