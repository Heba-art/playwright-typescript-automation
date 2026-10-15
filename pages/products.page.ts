import { Locator, Page } from '@playwright/test';

export class ProductsPage {
  page: Page;
  allProductsHeading: Locator;
  viewProductLinks: Locator;

  constructor(page: Page) {
    this.page = page;
    this.allProductsHeading = page.getByRole('heading', { name: 'All Products' });
    this.viewProductLinks = page.getByRole('link', { name: 'View Product' });
  }

  async open() {
    await this.page.goto('/products', { waitUntil: 'domcontentloaded' });
  }

  async openFirstProduct() {
    await this.viewProductLinks.first().click();
  }
}