import { test, expect } from '../../fixtures/test-fixtures';

import { SignupLoginPage } from '../../pages/signup-login.page';
import { AccountStatusPage } from '../../pages/account-status.page';

test('TC-UI-002: Login with correct credentials', async ({ page, registeredUser }) => {
  test.setTimeout(60_000);

  const signupLoginPage = new SignupLoginPage(page);
  const accountStatusPage = new AccountStatusPage(page);

  // Precondition (registered user exists) is created through the API by the fixture.
  await signupLoginPage.open();
  await expect(signupLoginPage.loginHeading).toBeVisible();

  await signupLoginPage.login(registeredUser.email, registeredUser.password);

  await expect(accountStatusPage.loggedInAs(registeredUser.name)).toBeVisible();
  // Cleanup: the fixture deletes the account through the API.
});

test('TC-UI-003: Login with incorrect email and password', async ({ page }) => {
  const signupLoginPage = new SignupLoginPage(page);
  const invalidEmail = `not-registered-${Date.now()}@example.com`;
  const incorrectPassword = 'WrongPassword123!';

  await signupLoginPage.open();
  await expect(page).toHaveURL(/\/login/, { timeout: 15_000 });
  await expect(signupLoginPage.loginHeading).toBeVisible();

  await signupLoginPage.login(invalidEmail, incorrectPassword);

  await expect(signupLoginPage.loginErrorMessage).toBeVisible();
});

test('TC-UI-004: Logout user', async ({ page, registeredUser }) => {
  test.setTimeout(60_000);

  const signupLoginPage = new SignupLoginPage(page);
  const accountStatusPage = new AccountStatusPage(page);

  // Precondition: the user is logged in.
  await signupLoginPage.open();
  await signupLoginPage.login(registeredUser.email, registeredUser.password);
  await expect(accountStatusPage.loggedInAs(registeredUser.name)).toBeVisible();

  // Test: log out and confirm the session ended on the login page.
  await accountStatusPage.logout();

  await expect(page).toHaveURL(/\/login/);
  await expect(signupLoginPage.loginHeading).toBeVisible();
  await expect(accountStatusPage.loggedInAs(registeredUser.name)).toBeHidden();
  // Cleanup: the fixture deletes the account through the API.
});