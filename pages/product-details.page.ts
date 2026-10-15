import { Locator, Page } from '@playwright/test';

export class ProductDetailsPage {
  page: Page;
  productInformation: Locator;
  productName: Locator;
  category: Locator;
  price: Locator;
  availability: Locator;
  condition: Locator;
  brand: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productInformation = page.locator('.product-information');
    this.productName = this.productInformation.getByRole('heading');
    this.category = this.productInformation.getByText('Category:');
    this.price = this.productInformation.getByText('Rs.');
    this.availability = this.productInformation.locator('p').filter({ hasText: 'Availability:' });
    this.condition = this.productInformation.locator('p').filter({ hasText: 'Condition:' });
    this.brand = this.productInformation.locator('p').filter({ hasText: 'Brand:' });
  }
}