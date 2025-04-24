import { expect } from'@playwright/test'
import { test } from '../test-options'

test('drag and drops with iframe', async ({page, globalSqaUrl}) => {
    await page.goto(globalSqaUrl);

    const frame = page.frameLocator('[rel-title="Photo Manager"] iframe');
    
    //1
    const source =  frame.locator('li', {hasText: "High Tatras 2"});
    const target = frame.locator('#trash');
    await source.dragTo(target);


    //2
    const source1 =  frame.locator('li', {hasText: "High Tatras 4"});
    await source1.hover();
    await page.mouse.down();
    const target1 = frame.locator('#trash');
    await target1.hover();
    await page.mouse.up();

    await expect(frame.locator('#trash li h5')).toHaveText(["High Tatras 2", "High Tatras 4"]);
})