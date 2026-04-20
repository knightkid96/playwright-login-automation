const { test, expect } = require('@playwright/test');

test.describe('Login Tests', () => {

  test('Valid Login', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');

    await page.fill('#username', 'tomsmith');
    await page.fill('#password', 'SuperSecretPassword!');
    await page.click('button[type="submit"]');

    const successMessage = await page.locator('#flash').textContent();
    await expect(successMessage).toContain('You logged into a secure area!');
  });

  test('Invalid Login', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');

    await page.fill('#username', 'wronguser');
    await page.fill('#password', 'wrongpass');
    await page.click('button[type="submit"]');

    const errorMessage = await page.locator('#flash').textContent();
    await expect(errorMessage).toContain('Your username is invalid!');
  });

});
