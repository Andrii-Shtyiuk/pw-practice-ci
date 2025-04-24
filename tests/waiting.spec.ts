import {test, expect} from'@playwright/test'

test.beforeEach(async({page}) => {
    await page.goto(process.env.URL);
    await page.getByText('Button Triggering AJAX Request').click();
})


test('auto waiting', async({page}) => {
    const success = page.locator('.bg-success')
    
    // await success.waitFor({state: 'attached'});
    // const text = await success.allInnerTexts();
    // expect(text).toContain('Data loaded with AJAX get request.');

    await expect(success).toHaveText('Data loaded with AJAX get request.', {timeout: 16000});
})

test.skip('alternative waiting', async({page}) => {
    const success = page.locator('.bg-success');

    
    
    //await page.waitForSelector('.bg-success');

    //await page.waitForResponse('**/ajaxdata');

    await page.waitForLoadState('networkidle');

    const text = await success.allTextContents();
    expect(text).toContain('Data loaded with AJAX get request.');
})