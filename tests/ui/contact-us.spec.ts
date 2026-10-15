import { test, expect } from '../../fixtures/test-fixtures';
import { ContactUsPage } from '../../pages/contact-us.page';

test.beforeEach(async ({ page }) => {
  // Block Google ads so a full-screen ad cannot cover the form.
  await page.route(/googlesyndication\.com|doubleclick\.net/, (route) => route.abort());
  });

test('TC-UI-006: Submit contact form with file upload', async ({ page }) => {
  const contactUsPage = new ContactUsPage(page);

  await contactUsPage.open();
  await expect(contactUsPage.getInTouchHeading).toBeVisible();

  await contactUsPage.fillForm(
    'Heba QA',
    'heba.qa@example.com',
    'Test subject',
    'Test message for TC-UI-006.',
  );
  await contactUsPage.uploadFile('test-data/files/contact-message.txt');
  await contactUsPage.submit();

  await expect(contactUsPage.successMessage).toHaveText(
    'Success! Your details have been submitted successfully.',
  );
});