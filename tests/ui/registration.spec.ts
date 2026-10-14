import { test, expect } from '../../fixtures/test-fixtures';

import { SignupLoginPage } from '../../pages/signup-login.page';
import { AccountStatusPage } from '../../pages/account-status.page';
import { RegistrationPage } from '../../pages/registration.page';

test('TC-UI-001: Register new user', async ({ page, newUser }) => {
  test.setTimeout(60_000);

  const signupLoginPage = new SignupLoginPage(page);
  const registrationPage = new RegistrationPage(page);
  const accountStatusPage = new AccountStatusPage(page);

  await signupLoginPage.open();
  await expect(signupLoginPage.newUserSignupHeading).toBeVisible();

  await signupLoginPage.startRegistration(newUser.name, newUser.email);
  await expect(page.getByText('Enter Account Information', { exact: true })).toBeVisible();

  await registrationPage.completeRegistration(newUser);
  await expect(accountStatusPage.accountCreatedMessage).toBeVisible();

  await accountStatusPage.continueToHome();
  await expect(accountStatusPage.loggedInAs(newUser.name)).toBeVisible();

  // Deleting through the UI is part of this test case (steps 10–12).
  // If the test fails before this point, the fixture deletes the account through the API.
  await accountStatusPage.deleteAccount();
  await expect(accountStatusPage.accountDeletedMessage).toBeVisible();

  await accountStatusPage.continueToHome();
  await expect(page).toHaveURL('https://automationexercise.com/');
});

test('TC-UI-005: Register user with existing email', async ({ page, registeredUser }) => {
  test.setTimeout(60_000);

  const signupLoginPage = new SignupLoginPage(page);

  // Precondition (email already registered) is created through the API by the fixture,
  // so this page is signed out and no second browser context is needed.
  await signupLoginPage.open();
  await expect(signupLoginPage.newUserSignupHeading).toBeVisible();

  await signupLoginPage.startRegistration(registeredUser.name, registeredUser.email);

  await expect(signupLoginPage.existingEmailErrorMessage).toBeVisible();
  // Cleanup: the fixture deletes the account through the API.
});