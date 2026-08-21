import {Locator,Page} from '@playwright/test';

export class AccountStatusPage{

page: Page;
accountCreatedMessage: Locator;
accountDeletedMessage: Locator;
continueLink: Locator;
deleteAccountLink: Locator;

constructor(page: Page) {
    this.page = page;
    this.accountCreatedMessage = page.getByText('Account Created!', {exact: true,});
    this.accountDeletedMessage = page.getByText('Account Deleted!', {exact: true,});
    this.continueLink = page.getByRole('link', { name: 'Continue' });
    this.deleteAccountLink = page.getByRole('link', {name: /Delete Account/,});
}

loggedInAs (name: string): Locator{
return this.page.getByText(`Logged in as ${name}`,{ exact: true },);
}
async continueToHome(){
    await this.continueLink.click();
}
async deleteAccount() {
    await this.deleteAccountLink.click();
}

}
