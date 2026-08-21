export interface RegistrationUser{

title: 'Mr' | 'Mrs';
name: string;
  email: string;
  password: string;
  birthDay: string;
  birthMonth: string;
  birthYear: string;
  firstName: string;
  lastName: string;
  company: string;
  address: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  mobileNumber: string;
}

export function createRegistrationUser(): RegistrationUser {
const uniqueId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
return {
    title: 'Mrs',
    name: 'Heba QA',
    email: `heba.qa.${uniqueId}@example.com`,
    password: 'QaTest@2026',
    birthDay: '10',
    birthMonth: 'May',
    birthYear: '1990',
    firstName: 'Heba',
    lastName: 'QA',
    company: 'Test Automation',
    address: '10 Test Street',
    country: 'Australia',
    state: 'Victoria',
    city: 'Melbourne',
    zipCode: '3000',
    mobileNumber: '0400000000',
  };
}