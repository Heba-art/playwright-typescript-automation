import { Locator, Page } from '@playwright/test';

export class SignupLoginPage{

page: Page;
loginErrorMessage: Locator;
loginHeading: Locator;
newUserSignupHeading: Locator;
existingEmailErrorMessage: Locator;

constructor(page: Page){
   this.page=page
   this.loginErrorMessage = page.getByText(
  'Your email or password is incorrect!',
  { exact: true },
); 
this.loginHeading = page.getByText(
  'Login to your account',
  { exact: true },
);
this.newUserSignupHeading = page.getByRole('heading', {
  name: 'New User Signup!',
  exact: true,
});

this.existingEmailErrorMessage = page.getByText(
  'Email Address already exist!',
  { exact: true },
);
}

async open(){
await this.page.goto('/login', {waitUntil: 'domcontentloaded',});
}

async startRegistration(name: string, email: string){

    const signupForm = this.page.locator('form').filter({ hasText: 'Signup' });
    await signupForm.getByPlaceholder('Name', { exact: true }).fill(name);
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