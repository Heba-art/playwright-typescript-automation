import {Page} from '@playwright/test';
import {RegistrationUser} from '../test-data/user-data';

export class RegistrationPage{
page : Page;

constructor(page: Page){
this.page = page;
}
async completeRegistration (user:RegistrationUser)
{
const title = user.title === 'Mrs' ? 'Mrs.' : 'Mr.';
await this.page.getByRole('radio', { name: title }).check();

await this.page.getByRole('textbox', { name: 'Password *' }).fill(user.password);

await this.page.locator('#days')
.selectOption(user.birthDay);

await this.page.locator('#months')
.selectOption(user.birthMonth);

await this.page.locator('#years')
.selectOption(user.birthYear);

await this.page.getByRole('checkbox', { name: 'Sign up for our newsletter!' }).check();

await this.page.getByRole('checkbox', { name: 'Receive special offers from' }).check();

await this.page.getByRole('textbox', { name: 'First name *' }).fill(user.firstName);

await this.page.getByRole('textbox', { name: 'Last name *' }).fill(user.lastName);

await this.page.getByRole('textbox', { name: 'Company', exact: true }).fill(user.company);

await this.page.locator('#address1').fill(user.address);

await this.page.getByLabel('Country *')
  .selectOption({ label: user.country });

await this.page.getByRole('textbox', { name: 'State *' }).fill(user.state);

await this.page.locator('#city').fill(user.city);

await this.page.locator('#zipcode').fill(user.zipCode);

await this.page.getByRole('textbox', {name: 'Mobile Number *',}).fill(user.mobileNumber);

await this.page.getByRole('button', {name: 'Create Account',}).click();

}
    

}



