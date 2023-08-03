const {test, expect} = require('@playwright/test');

//one
test('Test Login Fail - Incorrect Username', async ({browser}) =>
{
      const context = await browser.newContext();
      const page = await context.newPage();
      const userName = page.locator('#username');
      const password = page.locator("[type='password']");
      const signInButton = page.locator('#signInBtn');

      await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
      console.log(await page.title());
      await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
      await userName.type("rahulshetty");
      await password.type("learning");
      await signInButton.click();
      console.log(await signInButton.textContent());
      await expect(page.locator("[style*='block']")).toContainText('Incorrect');
});

//two
test('Test Login Success - Correct Username/Password', async ({browser}) =>
{
      const context = await browser.newContext();
      const page = await context.newPage();
      const userName = page.locator('#username');
      const password = page.locator("[type='password']");
      const signInButton = page.locator('#signInBtn');
      const homeTitle = page.locator('body > app-root > app-navbar > div > nav > a');
      const card = page.locator(".card-body a");

      await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
      console.log(await page.title());
      //Assert if the page title is correct
      await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
      //insert username
      await userName.type("rahulshettyacademy");
      //insert password
      await password.type("learning");
      //click sign in button
      await signInButton.click();
      //Check if homepage title is correct
      await expect(homeTitle).toContainText("ProtoCommerce");

});

//three
test('Test Get All Cards', async ({browser}) =>
{
      const context = await browser.newContext();
      const page = await context.newPage();
      const userName = page.locator('#username');
      const password = page.locator("[type='password']");
      const signInButton = page.locator('#signInBtn');
      const cardTitles = page.locator(".card-body a");

      await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
      console.log(await page.title());
      await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
      await userName.type("rahulshettyacademy");
      await password.type("learning");
      await signInButton.click();
      //Log all card products
      console.log(await cardTitles.first().textContent());
      console.log(await cardTitles.nth(1).textContent());
      const allTitles = await cardTitles.allTextContents();
      console.log(allTitles);
});

// //three
// test('Page Playwright test', async ({page}) =>
// {
//       await page.goto("https://google.com/");
//       //get title - assertion
//       console.log(await page.title());
//       await expect(page).toHaveTitle("Google");

// });