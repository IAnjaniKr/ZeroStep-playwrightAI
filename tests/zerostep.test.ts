import { expect, test } from '@playwright/test'
import { ai } from '@zerostep/playwright'

test('Test 1: My test', async ({ page }) => {
    // Navigate to the OpenCart demo website
    await ai('Navigate to the website https://demo.opencart.com/', { page, test });
  
    // Verify that the page title is "Your Store"
    const pageTitle = await ai('Get the page title', { page, test });
    expect(pageTitle).toBe('Your Store');
  
    // Search for the product "iphone"
    await ai('Search for the product "iphone"', { page, test });
  
    // Verify that the search results include the product "macbook"
    const productTitle = await ai('Get the text of the first product result', { page, test });
    expect(productTitle.toLowerCase()).toContain('macbook');

    // Verify that the search results include the product "iphone"
    const productTitleList = await ai('Get the list of text of the product titles in the result', { page, test });
    expect(productTitleList.toLowerCase()).toContain('iphone');
  
    // Add the product "iphone" to the cart
    await ai('Add the product "iphone" to the cart', { page, test });

    // Wait for the cart to update
    await page.waitForTimeout(5000);
  
    // Verify that the product has been added to the cart
    const cartCount = await ai('Get the cart count', { page, test });
    expect(parseInt(cartCount)).toBeGreaterThan(0);
  });


test('Test 2: zerostep example test', async ({ page }) => {
  await page.goto('https://zerostep.com/')

  // An object with page and test must be passed into every call
  const aiArgs = { page, test }
  const headerText = await ai('Get the header text', aiArgs)
  await page.goto('https://google.com/')
  await ai(`Type "${headerText}" in the search box`, aiArgs)
  await ai('Press enter', aiArgs)
})
  