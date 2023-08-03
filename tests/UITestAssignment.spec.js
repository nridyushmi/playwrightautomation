const {test, expect} = require('@playwright/test');

//one
test('Test Register Account', async ({page}) =>
{
      //locators
      const emailId = "lucyharper2@gmail.com";
      const firstName = page.locator('#firstName');
      const lastName = page.locator('#lastName');
      const userEmail = page.locator('#userEmail');
      const userMobile = page.locator('#userMobile');
      const password = page.locator("#userPassword");
      const confirmPassword = page.locator("#confirmPassword");
      const occupationDropdown = page.locator("[formcontrolname='occupation']");
      const successMessage = page.locator(".headcolor");
      const checkBox = page.locator("[type='checkbox']");
      //buttons
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
      await userEmail.type(emailId);
      await userMobile.type("6578891165");
      await occupationDropdown.selectOption('Doctor');
      await page.getByLabel('Female').check();
      await password.type("P@ssword123");
      await confirmPassword.type("P@ssword123");
      await checkBox.check();
      await RegisterButton.click();
      console.log(await createAccount.textContent());
      await expect(successMessage).toContainText("Account Created Successfully");
});

//two
test('Test Login Account', async ({page}) =>
{
      //locators
      const emailId = "lucyharper2@gmail.com";
      const userEmail = page.locator('#userEmail');
      const password = page.locator("#userPassword");   
      //button
      const loginButton = page.locator('#login');

      await page.goto("https://rahulshettyacademy.com/client/");
      console.log(await page.title());
      await expect(page).toHaveTitle("Let's Shop");
      await userEmail.type(emailId);
      await password.type("P@ssword123");
      await loginButton.click();
      await page.waitForLoadState('networkidle');
      const titles = await page.locator(".card-body b").allTextContents();
      console.log(titles);

});

//three
test.only('Test End to End', async ({browser}) =>
{
      //pages
      const context = await browser.newContext();
      const page = await context.newPage();
      //locators
      const emailId = "lucyharper2@gmail.com";
      const userEmail = page.locator('#userEmail');
      const password = page.locator("#userPassword");   
      const loginButton = page.locator('#login');
      const products = page.locator(".card-body");
      const productName = 'zara coat 3'

      //actions
      await page.goto("https://rahulshettyacademy.com/client/");
      console.log(await page.title());
      //assert expect page title to be as expected
      await expect(page).toHaveTitle("Let's Shop");
      //insert email and password for login
      await userEmail.type(emailId);
      await password.type("P@ssword123");
      //login
      await loginButton.click();
      //wait for page to load
      await page.waitForLoadState('networkidle');
      //get all product card titles
      const titles = await products.allTextContents();
      console.log(titles);

      //choose a product and add to cart
      
      //count the products
      const count = await products.count();
      //iterate through the products
      for(let i=0; i < count; ++i){
            //check if it matches the product name
           if(await products.nth(i).locator('b').textContent() === productName)
           {
                  //find the add to cart button and click
                  await products.nth(i).locator('text= Add To Cart').click();
                  break;
           }
      }
      await page.locator("[routerlink*='cart']").click();
      await page.locator("div li").first().waitFor();
      const bool = await page.locator("h3:has-text('zara coat 3')").isVisible();
      expect(bool).toBeTruthy();
      await page.locator("text=Checkout").click();
      await page.locator("[placeholder*='Country']").type("ind", {delay:100});
      const dropdown = page.locator(".ta-results");
      await dropdown.waitFor();
      const optionsCount = await dropdown.locator("button").count();
      for(let i =0;i< optionsCount; ++i)
      {
            const text = await dropdown.locator("button").nth(i).textContent();
            console.log(text)
            if(text === " India")
            {
                  await dropdown.locator("button").nth(i).click();
                  break;
            }

      }
      await expect(page.locator(".user__name [type='text']")).toHaveText(emailId);




});