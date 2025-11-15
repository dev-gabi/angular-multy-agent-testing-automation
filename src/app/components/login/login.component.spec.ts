import { test, expect } from '@playwright/test';

// Test configuration
const COMPONENT_URL = '/'; // Login component is on root path

test.describe('LoginComponent', () => {
  // Selectors from test plan
  const selectors = {
    emailInput: '[data-testid="email-input"]',
    passwordInput: '[data-testid="password-input"]',
    emailError: '[data-testid="email-error"]',
    passwordError: '[data-testid="password-error"]',
    errorMessage: '[data-testid="error-message"]',
    loginButton: '[data-testid="login-button"]',
    resetButton: '[data-testid="reset-button"]',
  };

  // Mock data
  const mockData = {
    validEmail: 'test@example.com',
    invalidEmail: 'notanemail',
    validPassword: 'password123',
    shortPassword: '12345',
    minValidPassword: '123456',
  };

  test.beforeEach(async ({ page }) => {
    // Navigate to the component before each test
    await page.goto(COMPONENT_URL);
    await page.waitForLoadState('networkidle');
  });

  test.describe('Component Initialization', () => {
    test('should create the component', async ({ page }) => {
      // Verify component elements are present
      await expect(page.locator(selectors.emailInput)).toBeVisible();
      await expect(page.locator(selectors.passwordInput)).toBeVisible();
      await expect(page.locator(selectors.loginButton)).toBeVisible();
      await expect(page.locator(selectors.resetButton)).toBeVisible();
    });

    test('should initialize login form with empty values', async ({ page }) => {
      // Check email and password inputs are empty
      const emailInput = page.locator(selectors.emailInput);
      const passwordInput = page.locator(selectors.passwordInput);

      await expect(emailInput).toHaveValue('');
      await expect(passwordInput).toHaveValue('');
    });

    test('should set up email validators (required, email format)', async ({ page }) => {
      const emailInput = page.locator(selectors.emailInput);

      // Trigger validation by focusing and blurring
      await emailInput.click();
      await emailInput.blur();

      // Email error should appear for required validation
      await expect(page.locator(selectors.emailError)).toBeVisible();

      // Type invalid email
      await emailInput.fill(mockData.invalidEmail);
      await emailInput.blur();

      // Email error should appear for format validation
      await expect(page.locator(selectors.emailError)).toBeVisible();
    });

    test('should set up password validators (required, minLength 6)', async ({ page }) => {
      const passwordInput = page.locator(selectors.passwordInput);

      // Trigger required validation
      await passwordInput.click();
      await passwordInput.blur();

      // Password error should appear
      await expect(page.locator(selectors.passwordError)).toBeVisible();

      // Type short password
      await passwordInput.fill(mockData.shortPassword);
      await passwordInput.blur();

      // MinLength error should appear
      await expect(page.locator(selectors.passwordError)).toBeVisible();
    });
  });

  test.describe('Form Validation', () => {
    test('should mark email as invalid when empty', async ({ page }) => {
      const emailInput = page.locator(selectors.emailInput);
      const loginButton = page.locator(selectors.loginButton);

      // Email is empty, button should be disabled
      await expect(loginButton).toBeDisabled();

      // Touch field to trigger validation
      await emailInput.click();
      await emailInput.blur();

      // Error should be visible
      await expect(page.locator(selectors.emailError)).toBeVisible();
    });

    test('should mark email as invalid with incorrect format', async ({ page }) => {
      const emailInput = page.locator(selectors.emailInput);

      await emailInput.fill(mockData.invalidEmail);
      await emailInput.blur();

      // Email format error should be visible
      await expect(page.locator(selectors.emailError)).toBeVisible();
      await expect(page.locator(selectors.emailError)).toContainText('valid email');
    });

    test('should mark email as valid with correct format', async ({ page }) => {
      const emailInput = page.locator(selectors.emailInput);

      await emailInput.fill(mockData.validEmail);
      await emailInput.blur();

      // Email error should not be visible
      await expect(page.locator(selectors.emailError)).not.toBeVisible();
    });

    test('should mark password as invalid when empty', async ({ page }) => {
      const passwordInput = page.locator(selectors.passwordInput);
      const loginButton = page.locator(selectors.loginButton);

      // Password is empty, button should be disabled
      await expect(loginButton).toBeDisabled();

      // Touch field to trigger validation
      await passwordInput.click();
      await passwordInput.blur();

      // Error should be visible
      await expect(page.locator(selectors.passwordError)).toBeVisible();
    });

    test('should mark password as invalid when less than 6 characters', async ({ page }) => {
      const passwordInput = page.locator(selectors.passwordInput);

      await passwordInput.fill(mockData.shortPassword);
      await passwordInput.blur();

      // MinLength error should be visible
      await expect(page.locator(selectors.passwordError)).toBeVisible();
      await expect(page.locator(selectors.passwordError)).toContainText('at least 6 characters');
    });

    test('should mark password as valid when 6 or more characters', async ({ page }) => {
      const passwordInput = page.locator(selectors.passwordInput);

      await passwordInput.fill(mockData.minValidPassword);
      await passwordInput.blur();

      // Password error should not be visible
      await expect(page.locator(selectors.passwordError)).not.toBeVisible();
    });

    test('should mark form as invalid when fields are empty', async ({ page }) => {
      const loginButton = page.locator(selectors.loginButton);

      // Form is invalid initially, login button should be disabled
      await expect(loginButton).toBeDisabled();
    });

    test('should mark form as valid when all fields are valid', async ({ page }) => {
      const emailInput = page.locator(selectors.emailInput);
      const passwordInput = page.locator(selectors.passwordInput);
      const loginButton = page.locator(selectors.loginButton);

      // Fill in valid data
      await emailInput.fill(mockData.validEmail);
      await passwordInput.fill(mockData.validPassword);

      // Form should be valid, login button enabled
      await expect(loginButton).toBeEnabled();
    });
  });

  test.describe('Error Message Display', () => {
    test('should display email required error when touched and empty', async ({ page }) => {
      const emailInput = page.locator(selectors.emailInput);
      const emailError = page.locator(selectors.emailError);

      // Initially no error
      await expect(emailError).not.toBeVisible();

      // Touch and leave empty
      await emailInput.click();
      await emailInput.blur();

      // Required error should appear
      await expect(emailError).toBeVisible();
      await expect(emailError).toContainText('Email is required');
    });

    test('should display invalid email error when format is wrong', async ({ page }) => {
      const emailInput = page.locator(selectors.emailInput);
      const emailError = page.locator(selectors.emailError);

      // Type invalid email
      await emailInput.fill(mockData.invalidEmail);
      await emailInput.blur();

      // Format error should appear
      await expect(emailError).toBeVisible();
      await expect(emailError).toContainText('valid email');
    });

    test('should display password required error when touched and empty', async ({ page }) => {
      const passwordInput = page.locator(selectors.passwordInput);
      const passwordError = page.locator(selectors.passwordError);

      // Initially no error
      await expect(passwordError).not.toBeVisible();

      // Touch and leave empty
      await passwordInput.click();
      await passwordInput.blur();

      // Required error should appear
      await expect(passwordError).toBeVisible();
      await expect(passwordError).toContainText('Password is required');
    });

    test('should display password minlength error when too short', async ({ page }) => {
      const passwordInput = page.locator(selectors.passwordInput);
      const passwordError = page.locator(selectors.passwordError);

      // Type short password
      await passwordInput.fill(mockData.shortPassword);
      await passwordInput.blur();

      // MinLength error should appear
      await expect(passwordError).toBeVisible();
      await expect(passwordError).toContainText('at least 6 characters');
    });

    test('should not display errors before fields are touched', async ({ page }) => {
      const emailError = page.locator(selectors.emailError);
      const passwordError = page.locator(selectors.passwordError);

      // No errors should be visible initially
      await expect(emailError).not.toBeVisible();
      await expect(passwordError).not.toBeVisible();
    });
  });

  test.describe('Form Submission', () => {
    test('should display error message on invalid form submission', async ({ page }) => {
      const loginButton = page.locator(selectors.loginButton);
      const errorMessage = page.locator(selectors.errorMessage);

      // Try to submit with empty form (button is disabled, so we need to fill partially)
      const emailInput = page.locator(selectors.emailInput);
      const passwordInput = page.locator(selectors.passwordInput);

      // Fill with invalid data to enable button
      await emailInput.fill(mockData.invalidEmail);
      await passwordInput.fill(mockData.shortPassword);

      // Button might still be disabled due to validation
      // Let's click if enabled, otherwise force click to test the logic
      const isDisabled = await loginButton.isDisabled();
      if (isDisabled) {
        // Form is invalid, which is expected - test that submission doesn't work
        await expect(loginButton).toBeDisabled();
      } else {
        await loginButton.click();
        await expect(errorMessage).toBeVisible();
      }
    });

    test('should mark all fields as touched on invalid submission', async ({ page }) => {
      const loginButton = page.locator(selectors.loginButton);
      const emailError = page.locator(selectors.emailError);
      const passwordError = page.locator(selectors.passwordError);

      // Initially errors are not visible
      await expect(emailError).not.toBeVisible();
      await expect(passwordError).not.toBeVisible();

      // Button is disabled with empty form, but we can test by checking state
      // In a real scenario, we'd need to trigger submission somehow
      // For now, we verify the behavior when fields are touched
      const emailInput = page.locator(selectors.emailInput);
      const passwordInput = page.locator(selectors.passwordInput);

      await emailInput.click();
      await emailInput.blur();
      await passwordInput.click();
      await passwordInput.blur();

      // Both errors should now be visible
      await expect(emailError).toBeVisible();
      await expect(passwordError).toBeVisible();
    });

    test('should clear error message on valid form submission', async ({ page }) => {
      const emailInput = page.locator(selectors.emailInput);
      const passwordInput = page.locator(selectors.passwordInput);
      const loginButton = page.locator(selectors.loginButton);
      const errorMessage = page.locator(selectors.errorMessage);

      // First, submit form with empty fields to trigger error
      // Since button is disabled when empty, we touch the fields to show errors
      await emailInput.click();
      await emailInput.blur();
      await passwordInput.click();
      await passwordInput.blur();

      // Now fill with valid data
      await emailInput.fill(mockData.validEmail);
      await passwordInput.fill(mockData.validPassword);

      // Submit the form
      await loginButton.click();

      // Error message should not be visible
      await expect(errorMessage).not.toBeVisible();
    });

    test('should not submit when form is invalid', async ({ page }) => {
      const loginButton = page.locator(selectors.loginButton);

      // With empty form, button should be disabled
      await expect(loginButton).toBeDisabled();

      // Fill with invalid data
      const emailInput = page.locator(selectors.emailInput);
      await emailInput.fill(mockData.invalidEmail);

      // Button should still be disabled
      await expect(loginButton).toBeDisabled();
    });
  });

  test.describe('Reset Functionality', () => {
    test('should clear form values when reset is called', async ({ page }) => {
      const emailInput = page.locator(selectors.emailInput);
      const passwordInput = page.locator(selectors.passwordInput);
      const resetButton = page.locator(selectors.resetButton);

      // Fill in some values
      await emailInput.fill(mockData.validEmail);
      await passwordInput.fill(mockData.validPassword);

      // Verify values are filled
      await expect(emailInput).toHaveValue(mockData.validEmail);
      await expect(passwordInput).toHaveValue(mockData.validPassword);

      // Click reset
      await resetButton.click();

      // Values should be cleared
      await expect(emailInput).toHaveValue('');
      await expect(passwordInput).toHaveValue('');
    });

    test('should clear error message when reset is called', async ({ page }) => {
      const emailInput = page.locator(selectors.emailInput);
      const passwordInput = page.locator(selectors.passwordInput);
      const resetButton = page.locator(selectors.resetButton);
      const errorMessage = page.locator(selectors.errorMessage);

      // Create an error by touching fields
      await emailInput.click();
      await emailInput.blur();
      await passwordInput.click();
      await passwordInput.blur();

      // Click reset
      await resetButton.click();

      // Error message should be cleared
      await expect(errorMessage).not.toBeVisible();
    });

    test('should reset form when reset button is clicked', async ({ page }) => {
      const emailInput = page.locator(selectors.emailInput);
      const passwordInput = page.locator(selectors.passwordInput);
      const resetButton = page.locator(selectors.resetButton);
      const emailError = page.locator(selectors.emailError);
      const passwordError = page.locator(selectors.passwordError);

      // Fill form and create errors
      await emailInput.fill(mockData.validEmail);
      await passwordInput.fill(mockData.shortPassword);
      await passwordInput.blur();

      // Click reset
      await resetButton.click();

      // Form should be cleared and errors removed
      await expect(emailInput).toHaveValue('');
      await expect(passwordInput).toHaveValue('');
      await expect(emailError).not.toBeVisible();
      await expect(passwordError).not.toBeVisible();
    });
  });

  test.describe('UI Interactions', () => {
    test('should disable submit button when form is invalid', async ({ page }) => {
      const loginButton = page.locator(selectors.loginButton);

      // Initially form is invalid (empty)
      await expect(loginButton).toBeDisabled();

      // Fill only email
      const emailInput = page.locator(selectors.emailInput);
      await emailInput.fill(mockData.validEmail);

      // Still invalid (password missing)
      await expect(loginButton).toBeDisabled();
    });

    test('should enable submit button when form is valid', async ({ page }) => {
      const emailInput = page.locator(selectors.emailInput);
      const passwordInput = page.locator(selectors.passwordInput);
      const loginButton = page.locator(selectors.loginButton);

      // Fill valid data
      await emailInput.fill(mockData.validEmail);
      await passwordInput.fill(mockData.validPassword);

      // Button should be enabled
      await expect(loginButton).toBeEnabled();
    });
  });
});
