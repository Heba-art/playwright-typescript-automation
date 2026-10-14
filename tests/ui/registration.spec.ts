import {test,expect} from '@playwright/test';

import {SignupLoginPage} from '../../pages/signup-login.page';
import {AccountStatusPage} from '../../pages/account-status.page';
import {RegistrationPage} from '../../pages/registration.page';
import { createRegistrationUser } from '../../test-data/user-data';

test('TC-UI-001: Register new user', async ({ page }) => {
  test.setTimeout(60_000);

const user = createRegistrationUser();

const signupLoginPage = new SignupLoginPage(page);
const registrationPage = new RegistrationPage (page);
const accountStatusPage = new AccountStatusPage(page);
 
await signupLoginPage.open();

 await expect(page.getByRole('heading', {
        name: 'New User Signup!',
      }),
).toBeVisible();

await signupLoginPage.startRegistration(
    user.name,
    user.email,
);

await expect(page.getByText(
        'Enter Account Information',
        { exact: true },
      ),
    ).toBeVisible()

await registrationPage.completeRegistration(user);

await  expect (accountStatusPage.accountCreatedMessage,
    ).toBeVisible();

await  accountStatusPage.continueToHome();

await expect(accountStatusPage.loggedInAs(user.name),
    ).toBeVisible();

await accountStatusPage.deleteAccount();
await expect(accountStatusPage.accountDeletedMessage,
    ).toBeVisible();

await accountStatusPage.continueToHome();

await expect(page).toHaveURL(
    'https://automationexercise.com/',
    );
  },
);

test('TC-UI-005: Register user with existing email', async ({ page, browser, request }) => {
  test.setTimeout(60_000);

  const user = createRegistrationUser();
  const signupLoginPage = new SignupLoginPage(page);
  const registrationPage = new RegistrationPage(page);
  const accountStatusPage = new AccountStatusPage(page);

  // Create the account in the original session.
  await signupLoginPage.open();
  await signupLoginPage.startRegistration(user.name, user.email);
  await registrationPage.completeRegistration(user);
  await expect(accountStatusPage.accountCreatedMessage).toBeVisible();
  await accountStatusPage.continueToHome();
  await expect(accountStatusPage.loggedInAs(user.name)).toBeVisible();

  // Try the same email in a separate, signed-out session.
  const guestContext = await browser.newContext({
    baseURL: 'https://automationexercise.com',
  });

  try {
    const guestPage = await guestContext.newPage();
    const guestSignupPage = new SignupLoginPage(guestPage);

    await guestSignupPage.open();
    await expect(
      guestPage.getByRole('heading', {
        name: 'New User Signup!',
        exact: true,
      }),
    ).toBeVisible();

    await guestSignupPage.startRegistration(user.name, user.email);
    await expect(
      guestPage.getByText('Email Address already exist!', { exact: true }),
    ).toBeVisible();
  } finally {
    await guestContext.close();
  }

  // Delete the account from the original session.
  const cleanupResponse = await request.delete(
  'https://automationexercise.com/api/deleteAccount',
  {
    form: {
      email: user.email,
      password: user.password,
    },
  },
);

expect(cleanupResponse.ok()).toBeTruthy();
expect((await cleanupResponse.json()).responseCode).toBe(200);
});