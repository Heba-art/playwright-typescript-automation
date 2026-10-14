import {test, expect} from '@playwright/test';

import { SignupLoginPage } from '../../pages/signup-login.page';
import { RegistrationPage } from '../../pages/registration.page';
import { AccountStatusPage } from '../../pages/account-status.page';
import { createRegistrationUser } from '../../test-data/user-data';

test('TC-UI-002: Login with correct credentials',async ({page}) => {
test.setTimeout(60_000);

const user = createRegistrationUser();

const signupLoginPage = new SignupLoginPage(page);
const registrationPage = new RegistrationPage(page);
const accountStatusPage = new AccountStatusPage(page);

// Setup: create an account for this test.
await signupLoginPage.open();

await signupLoginPage.startRegistration(
    user.name,
    user.email,
);
 await registrationPage.completeRegistration(user);

 await expect(accountStatusPage.accountCreatedMessage,).toBeVisible();

 await accountStatusPage.continueToHome();

 await expect(accountStatusPage.loggedInAs(user.name),).toBeVisible();

  // Log out before testing login.
 await accountStatusPage.logout();

 await expect(
    page.getByRole('heading', {
      name: 'Login to your account',
      exact: true,
    }),
  ).toBeVisible();

   await expect(
    accountStatusPage.loggedInAs(user.name),
  ).toBeHidden();

  // Test: log in with the registered credentials.

  await signupLoginPage.login(
    user.email,
    user.password,
  );

  await expect (accountStatusPage.loggedInAs(user.name),).toBeVisible();

  // Cleanup: delete the test account.

  await accountStatusPage.deleteAccount();

  await expect(accountStatusPage.accountDeletedMessage,).toBeVisible();

  await accountStatusPage.continueToHome();
},
);

test('TC-UI-003: Login with incorrect email and password', async ({ page }) => {
const signupLoginPage = new SignupLoginPage(page);
const invalidEmail = `not-registered-${Date.now()}@example.com`;
const incorrectPassword = 'WrongPassword123!';

 await signupLoginPage.open();

   await expect(
    page.getByText('Login to your account', { exact: true }),
  ).toBeVisible()

await signupLoginPage.login(invalidEmail, incorrectPassword);

await expect(signupLoginPage.loginErrorMessage).toBeVisible();

});