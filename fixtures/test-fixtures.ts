import { test as base, expect } from '@playwright/test';
import { createRegistrationUser, RegistrationUser } from '../test-data/user-data';
import { createAccountViaApi, deleteAccountViaApi } from '../utils/account-api';

type AccountFixtures = {
  /**
   * Unique user data for a test that registers through the UI.
   * The test deletes the account itself. If the test fails before
   * that step, this fixture tries to delete the account through the API.
   */
  newUser: RegistrationUser;

  /**
   * An account that already exists before the test starts.
   * It is created through the API and always deleted through the API
   * after the test, whether the test passed or failed.
   */
  registeredUser: RegistrationUser;
};

export const test = base.extend<AccountFixtures>({
  /**
   * Records every 5xx response from the application under test and adds
   * it to the HTML report as a "server error" annotation, so an outage
   * can be seen in the report without opening the trace.
   * It labels failures; it does not change any test result.
   */
  page: async ({ page, baseURL }, use, testInfo) => {
    const appHost = new URL(baseURL ?? 'https://automationexercise.com').hostname;
    const serverErrors: string[] = [];

    page.on('response', (response) => {
      const url = new URL(response.url());

      if (url.hostname === appHost && response.status() >= 500) {
        serverErrors.push(
          `${response.request().method()} ${url.pathname} → HTTP ${response.status()} ` +
            `at ${new Date().toISOString()}`,
        );
      }
    });

    await use(page);

    for (const description of serverErrors) {
      testInfo.annotations.push({ type: 'server error', description });
    }
  },

  newUser: async ({ request }, use, testInfo) => {
    const user = createRegistrationUser();

    await use(user);

    if (testInfo.status === testInfo.expectedStatus) {
      return;
    }

    // The test stopped before its own "Delete Account" step.
    // The account may or may not exist, so a failed delete is recorded, not raised.
    try {
      const result = await deleteAccountViaApi(request, user);
      testInfo.annotations.push({
        type: 'cleanup',
        description: `API delete after failure: ${result.responseCode} ${result.message}`,
      });
    } catch (error) {
      testInfo.annotations.push({
        type: 'cleanup',
        description: `API delete after failure did not complete: ${String(error)}`,
      });
    }
  },

  registeredUser: async ({ request }, use) => {
    const user = createRegistrationUser();
    await createAccountViaApi(request, user);

    await use(user);

    const result = await deleteAccountViaApi(request, user);
    expect(
      result.responseCode,
      `Cleanup: DELETE /api/deleteAccount returned ${result.responseCode} (${result.message})`,
    ).toBe(200);
  },
});

export { expect };