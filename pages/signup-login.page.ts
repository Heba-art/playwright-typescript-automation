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

async login (email:string, password: string){
const loginForm = this.page.locator('form').filter({hasText: 'Login'});
await loginForm.getByPlaceholder('Email Address').fill(email);
await loginForm.getByPlaceholder('Password').fill(password);
await loginForm.getByRole('button', {name: 'Login',
      exact: true,
    }).click();
}
}