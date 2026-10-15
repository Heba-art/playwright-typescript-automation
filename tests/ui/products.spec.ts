import { test, expect } from '../../fixtures/test-fixtures';
import { ProductsPage } from '../../pages/products.page';
import { ProductDetailsPage } from '../../pages/product-details.page';

test.beforeEach(async ({ page }) => {
  // Block Google ads so a full-screen ad cannot cover the page.
  await page.route(/googlesyndication\.com|doubleclick\.net/, (route) => route.abort());
});

test('TC-UI-007: View products and product details', async ({ page }) => {
  const productsPage = new ProductsPage(page);
  const productDetailsPage = new ProductDetailsPage(page);

  // 1. Open Products
  await productsPage.open();
  await expect(productsPage.allProductsHeading).toBeVisible();

  // 2. Verify product list
  await expect(productsPage.viewProductLinks).not.toHaveCount(0);

  // 3. Open a product
  await productsPage.openFirstProduct();
  await expect(page).toHaveURL(/\/product_details\/1/);

  // 4. Review product information
  await expect(productDetailsPage.productName).toHaveText('Blue Top');
  await expect(productDetailsPage.category).toHaveText('Category: Women > Tops');
  await expect(productDetailsPage.price).toHaveText('Rs. 500');
  await expect(productDetailsPage.availability).toHaveText('Availability: In Stock');
  await expect(productDetailsPage.condition).toHaveText('Condition: New');
  await expect(productDetailsPage.brand).toHaveText('Brand: Polo');
});