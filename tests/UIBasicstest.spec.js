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
      await userName.type("rahulshettyyy");
      await password.type("learning");
      await signInButton.click();
      console.log(await signInButton.textContent());
      await expect(page.locator("[style*='block']")).toContainText('Incorrect');
});

//two
test.only('Test Login Success - Correct Username/Password', async ({browser}) =>
{
      //locators
      const context = await browser.newContext();
      const page = await context.newPage();
      const userName = page.locator('#username');
      const password = page.locator("[type='password']");
      const signInButton = page.locator('#signInBtn');
      const homeTitle = page.locator('body > app-root > app-navbar > div > nav > a');

      await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
      console.log(await page.title());
      //Assert if the page title is correct
      await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
      //insert username & password
      await userName.type("rahulshettyacademy");
      await password.type("learning");
      //click sign in button
      await signInButton.click();
      //Check if homepage title is correct
      await expect(homeTitle).toContainText("ProtoCommerce");

});

//three
test('Test Get All Cards', async ({browser}) =>
{
      //locators
      const context = await browser.newContext();
      const page = await context.newPage();
      const userName = page.locator('#username');
      const password = page.locator("[type='password']");
      const signInButton = page.locator('#signInBtn');
      const cardTitles = page.locator(".card-body a");

      await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
      console.log(await page.title());
      await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
      //insert username & password
      await userName.type("rahulshettyacademy");
      await password.type("learning");
      //race condition
      await Promise.all(
            [
                  page.waitForNavigation(),
                   signInButton.click(),
            ]
      );
      // console.log(await cardTitles.first().textContent());
      // console.log(await cardTitles.nth(1).textContent());
      const allTitles = await cardTitles.allTextContents();
      console.log(allTitles);
});

//four
test('UI Controls', async ({page}) =>
{
      //locators
      const userName = page.locator('#username');
      const password = page.locator("[type='password']");
      const signInButton = page.locator('#signInBtn');
      const dropdown = page.locator('select.form-control');
      const radio = page.locator('.radiotextsty').last();
      const okayButton = page.locator('#okayBtn').last();
      const terms = page.locator('#terms');
      const documentLink = page.locator('[href*="documents-request"]');
      
      //goto Link
      await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
      console.log(await page.title());
      //Check title
      await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
      //input username and password
      await userName.type("rahulshettyacademy");
      await password.type("learning");
      //select occupation and gender 
      await dropdown.selectOption("consult");
      await radio.click();
      //click okay to popup
      await okayButton.click();
      console.log(await radio.isChecked());
      //assert expect radio button to be checked
      await expect(radio).toBeChecked();
      //check the terms checkbox
      await terms.click();
      //assert expect terms checkbox to be checked
      await expect(terms).toBeChecked();
      //uncheck the terms checkbox
      await terms.uncheck();
      //assert expect terms checkbox to be NOT checked - falsy
      expect( await terms.isChecked()).toBeFalsy();
      //assert expect the link to have the blinking attribute
      await expect(documentLink).toHaveAttribute("class","blinkingText");

      //pausing for Playwright inspector
      await page.pause()
      await Promise.all(
            [
                  page.waitForNavigation(),
                   signInButton.click(),
            ]
      );
});

//five
test('Child Windows hadl', async ({browser}) => 
{
      const context = await browser.newContext();
      const page = await context.newPage();
      //locators
      const documentLink = page.locator('[href*="documents-request"]');
      const userName = page.locator('#username');
      const password = page.locator("[type='password']");
      
      //goto Link
      await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
      //wrap in promise, for a new tab
      const [newPage] = await Promise.all(
            [
                  //wait for event for the new page will open
                  context.waitForEvent('page'),
                  await documentLink.click(),
            ]
      );
      //find in the new page, the locator
      const text = await newPage.locator(".red").textContent();
      const arrayText = text.split("@");
      const domain = arrayText[1].split(" ")[0];
      console.log(domain);
      await userName.type(domain);
      await page.pause();
      console.log(await userName.textContent());



});