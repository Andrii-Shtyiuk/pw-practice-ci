import { test, expect, type Page } from'@playwright/test'
import { PageManager } from '../page-objects/pageManager';
import { faker } from '@faker-js/faker'
import { pathToFileURL } from 'url';

test.beforeEach(async({page}) => {
    await page.goto('/');
})

test('Using page objects', async({page}) => {
    const pm = new PageManager(page)
    const randomFullName = faker.person.fullName();
    const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(100)}@${faker.internet.domainName()}`
    const randomPassword = faker.internet.password();

    await pm.getNavBar().navigateToFormsLayoutsPage();

    await pm.getFormLayoutsPage().submitFormWithCredentials(process.env.USERNAME, process.env.PASSWORD, "Option 1");
    await page.screenshot({path: 'screenshots/formLayoutsPage.png'})
    const buffer = await page.screenshot()
    console.log(buffer.toString('base64'));

    await pm.getFormLayoutsPage().submitInlineForm(randomFullName, randomEmail, true)
    await page.locator('nb-card', {hasText: "Inline form"}).screenshot({path: 'screenshots/inlineForm.png'})

    expect(await pm.getNavBar().formLayoutsItem.isVisible()).toBeTruthy()
})

test('Using page objects 2', async({page}) => {
    const pm = new PageManager(page)
    await pm.getNavBar().navigateToDatepickerPage()

    let date = new Date();
    date.setDate(date.getDate() - 20);
    await pm.getDatePickerPage().selectCommonDatefromToday(date)
    let toDate = new Date()
    toDate.setDate(toDate.getDate() + 40)
    await pm.getDatePickerPage().selectDateRange(date, toDate)
})