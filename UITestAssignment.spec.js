const {test, expect} = require('@playwright/test');

//one
test.only('Test Register Account', async ({browser}) =>
{
      const context = await browser.newContext();
      const page = await context.newPage();
      const firstName = page.locator('#firstName');
      const lastName = page.locator('#lastName');
      const userEmail = page.locator('#userEmail');
      const userMobile = page.locator('#userMobile');
      const password = page.locator("#userPassword");
      const occupationDropdown = page.locator("[formcontrolname='occupation']");;
      
      const RegisterButton = page.locator('#login');
      const createAccount = page.locator(".login-wrapper-footer-text");

      await page.goto("https://rahulshettyacademy.com/client/");
      console.log(await page.title());
      await expect(page).toHaveTitle("Let's Shop");
      console.log(await createAccount.textContent());
      await expect(createAccount).toContainText("Don't have an account? ");
      await createAccount.click();
      await firstName.type("Lucy");
      await lastName.type("Harper");
      await userEmail.type("lucyharper@gmail.com");
      await userMobile.type("657889065");
      await occupationDropdown.selectOption('Doctor');
      await page.getByLabel('Female').check();
      await password.type("password123");
      await RegisterButton.click();
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
test.only('Test Get All Cards', async ({browser}) =>
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