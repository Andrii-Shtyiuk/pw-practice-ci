import {test, expect} from'@playwright/test'

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/');
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
})


test('Locator syntax', async({page}) => {
    //by Tag name
    //page.locator('input').fill('Test');
    //by class name
    //page.locator('.input-full-width').fill('Test1');
    //by id
    page.locator(':text("Using")')
    page.locator(':text-is("Using the Grid")')
    await page.locator('input').nth(0).click();
    await page.locator('#inputEmail1').fill('Test2');
    //by attribute
    // await page.locator('[placeholder="Email"]').nth(0).fill('Test3');
    // //by text
    // await page.locator('input[placeholder="Email"]').nth(0).fill('Test4');
    // //by xpath
    // await page.locator('//input[@placeholder="Email"]').nth(0).fill('Test5');
    // //by css
    // await page.locator('input[placeholder="Email"]').nth(0).fill('Test6');
    // //by css with nth
    // await page.locator('input[placeholder="Email"]').nth(0).fill('Test6');
    //by css with nth and class
    //await page.locator('input[placeholder="Email"]').nth(0).locator('.input-full-width').fill('Test7');
    //by css with nth and id
    //await page.locator('input[placeholder="Email"]').nth(0).locator('#inputEmail1').fill('Test8');
    //by css with nth and placeholder
    //await page.locator('input[placeholder="Email"]').nth(0).locator('[placeholder="Email"]').fill('Test9');
    
    //by css with nth and text
})

test('User facing locators', async({page}) => {

    await page.getByRole('textbox', {name: 'Email'}).first().fill('Test10');
    await page.getByRole('button', {name: 'Sign in'}).first().click();
    await page.getByLabel('Email').first().fill('Test100000000');
    await page.getByPlaceholder('Jane Doe').click();
    await page.getByText('Using the Grid').click();
    await page.locator('nb-card').filter({hasText: "Using the Grid"}).getByRole('button', {name: 'Sign in'}).click();
    await page.getByTitle('IoT Dashboard').click();

})

test('Child locators', async({page}) => {

    await page.locator('nb-card nb-radio :text-is("Option 1")').click();
    await page.locator('nb-card').locator(':text-is("Option 2")').click();
    await page.locator('nb-card').getByRole('button', {name: "Sign in"}).first().click();
    await page.locator('nb-card').nth(3).getByRole('button').click();
})

test('Parent locators', async({page}) => {
    await page.locator('nb-card', {hasText: "Using"}).getByRole('textbox', {name: 'Email'}).click();
    await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('textbox', {name: 'Email'}).fill('Test11');
    
    await page.locator('nb-card').filter({hasText: "Basic Form"}).getByRole('textbox', {name: 'Email'}).fill('Test12');
    await page.locator('nb-card').filter({has: page.locator('[status="danger"]')}).getByRole('textbox', {name: 'Password'}).fill('Password');

    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: 'Sign in'}).getByRole('textbox', {name: 'Email'}).fill('Test0000000');

    
    
})

test('Reuse locators', async({page}) => {
    const basicForm = page.locator('nb-card').filter({hasText: "Basic Form"});
    const emailInput = basicForm.getByRole('textbox', {name: 'Email'})
    await emailInput.fill('Test12');
    await basicForm.getByRole('textbox', {name: 'Password'}).fill('Password');
    await basicForm.locator('nb-checkbox').click();
    await basicForm.getByRole('button', {name: 'Submit'}).click();
    
    await expect(emailInput).toHaveValue('Test12');
})

test('Extracting values', async({page}) => {
    const basicForm = page.locator('nb-card').filter({hasText: "Basic Form"});
    const buttonText = await basicForm.locator('button').textContent();

    expect(buttonText).toEqual('Submit');

    const allLabels = await page.locator('nb-radio').allTextContents();
    
    expect(allLabels).toContain('Option 1');

    const emailInput = basicForm.getByRole('textbox', {name: 'Email'})
    await emailInput.fill('Test12');
    const entered = await emailInput.inputValue();

    expect(entered).toEqual('Test12');

    const attr = await emailInput.getAttribute('placeholder');
    expect(attr).toEqual('Email');
})

// test.describe('suite1', () => {

//     test.beforeEach(async({page}) => {
//         await page.getByText('Forms').click();
//     })

//     test('Navigate to Form Layouts', async ({page}) => {
    
//         await page.getByText('Form Layouts').click();
//     })
    
//     test('Navigate to Datepicker page', async ({page}) => {
        
//         await page.getByText('Datepicker').click();
//     })
// })

// test.describe('suite2', () => {

//     test.beforeEach(async({page}) => {
//         await page.getByText('Modal & Overlays').click();
//     })

//     test('Navigate to Dialog page', async ({page}) => {
    
//         await page.getByText('Dialog').click();
//     })
    
//     test('Navigate to Window page', async ({page}) => {
        
//         await page.getByText('Window').click();
//     })
// })
