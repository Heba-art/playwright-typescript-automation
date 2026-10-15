import { Locator, Page } from '@playwright/test';

export class ContactUsPage {
  page: Page;
  getInTouchHeading: Locator;
  nameInput: Locator;
  emailInput: Locator;
  subjectInput: Locator;
  messageInput: Locator;
  fileInput: Locator;
  submitButton: Locator;
  successMessage: Locator;

constructor(page: Page) {
    this.page = page;
    this.getInTouchHeading = page.getByRole('heading', { name: 'Get In Touch' });
    this.nameInput = page.getByRole('textbox', { name: 'Name' });
    this.emailInput = page.getByRole('textbox', { name: 'Email', exact: true });
    this.subjectInput = page.getByRole('textbox', { name: 'Subject' });
    this.messageInput = page.getByRole('textbox', { name: 'Your Message Here' });
    this.fileInput = page.locator('input[type="file"]');
    this.submitButton = page.getByRole('button', { name: 'Submit' });
    this.successMessage = page.locator('.status.alert-success');
  }


 async open() {
    await this.page.goto('/contact_us', { waitUntil: 'domcontentloaded' });
  }
  async fillForm(name: string, email: string, subject: string, message: string) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.subjectInput.fill(subject);
    await this.messageInput.fill(message);
  }

async uploadFile(filePath: string) {
    await this.fileInput.setInputFiles(filePath);
  }

async submit() {
    this.page.once('dialog', (dialog) => dialog.accept());
    await this.submitButton.click();
  }
}