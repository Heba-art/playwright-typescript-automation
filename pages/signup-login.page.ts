import {Page} from '@playwright/test';

export class SignupLoginPage{

page: Page;

constructor(page: Page){
   this.page=page 
}

async open(){
await this.page.goto('/login', {waitUntil: 'domcontentloaded',});
}

async startRegistration(name: string, email: string){

    const signupForm = this.page.locator('form').filter({ hasText: 'Signup' });
    await signupForm.getByRole('textbox', { name: 'Name' }).fill(name);
    await signupForm.getByPlaceholder('Email Address').fill(email);
    await signupForm.getByRole('button', { name: 'Signup' }).click();
}

}