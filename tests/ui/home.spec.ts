import {test, expect} from '@playwright/test';

test('TC-001: Verify home page loads successfully', async ({ page }) => { 
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveTitle('Automation Exercise');
})