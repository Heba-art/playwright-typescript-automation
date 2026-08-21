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
