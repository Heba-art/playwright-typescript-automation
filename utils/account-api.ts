import { APIRequestContext, APIResponse } from '@playwright/test';
import { RegistrationUser } from '../test-data/user-data';

export interface ApiResult {
  responseCode: number;
  message: string;
}

/**
 * Automation Exercise reports the result of an API call in the JSON
 * `responseCode`; the HTTP status itself is normally 200.
 * A different HTTP status (for example 503 or 520) means the request
 * failed before the application handled it, so the error message keeps
 * the status and the start of the response body as evidence.
 */
async function readApiResult(response: APIResponse, action: string): Promise<ApiResult> {
  const text = await response.text();

  if (response.status() !== 200) {
    throw new Error(
      `${action} failed with HTTP ${response.status()}.\n` +
        `Response body (first 300 characters):\n${text.slice(0, 300)}`,
    );
  }

  try {
    return JSON.parse(text) as ApiResult;
  } catch {
    throw new Error(
      `${action} returned HTTP 200 but the body was not JSON.\n` +
        `Response body (first 300 characters):\n${text.slice(0, 300)}`,
    );
  }
}

export async function createAccountViaApi(
  request: APIRequestContext,
  user: RegistrationUser,
): Promise<void> {
  const response = await request.post('/api/createAccount', {
    form: {
      name: user.name,
      email: user.email,
      password: user.password,
      title: user.title,
      birth_date: user.birthDay,
      birth_month: user.birthMonth,
      birth_year: user.birthYear,
      firstname: user.firstName,
      lastname: user.lastName,
      company: user.company,
      address1: user.address,
      address2: '',
      country: user.country,
      zipcode: user.zipCode,
      state: user.state,
      city: user.city,
      mobile_number: user.mobileNumber,
    },
  });

  const result = await readApiResult(response, 'POST /api/createAccount');

  if (result.responseCode !== 201) {
    throw new Error(
      `POST /api/createAccount: expected responseCode 201, ` +
        `received ${result.responseCode} (${result.message}).`,
    );
  }
}

export async function deleteAccountViaApi(
  request: APIRequestContext,
  user: RegistrationUser,
): Promise<ApiResult> {
  const response = await request.delete('/api/deleteAccount', {
    form: {
      email: user.email,
      password: user.password,
    },
  });

  return readApiResult(response, 'DELETE /api/deleteAccount');
}