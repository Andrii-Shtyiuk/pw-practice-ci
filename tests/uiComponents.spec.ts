import {test, expect} from'@playwright/test'

test.describe.configure({mode: 'parallel'})

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/');
})

test.describe('Form Layots tests', () => {
    test.describe.configure({retries: 1})
    test.describe.configure({mode: 'serial'})
    test.beforeEach(async({page}) => {
        await page.getByText('Forms').click();
        await page.getByText('Form Layouts').click();
    })

    test('input fields', async ({page}, testInfo) => {
        if(testInfo.retry) {
            //do smth
        }
        const inputGrid = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"});
        await inputGrid.fill("TestEmail");
        await inputGrid.clear();
        await inputGrid.pressSequentially("Paralalnfjkhsdfhafhjioajioj ioajsfiojasio fj");

        expect(await inputGrid.inputValue()).toEqual("Paralalnfjkhsdfhafhjioajioj ioajsfiojasio fj");

        await expect(inputGrid).toHaveValue("Paralalnfjkhsdfhafhjioajioj ioajsfiojasio fj");
    })
    
    test('radio buttons', async ({page}) => {
        const grid = page.locator('nb-card', {hasText: "Using the Grid"})
        
        //await grid.getByLabel('Option 1').check({force: true});
        await grid.getByRole('radio', {name: 'Option 1'}).check({force: true});

        const radioStatus = grid.getByRole('radio', {name: 'Option 1'}).isChecked();
        expect(radioStatus).toBeTruthy();

        await expect(grid.getByLabel('Option 1')).toBeChecked();

        await grid.getByRole('radio', {name: 'Option 2'}).check({force: true});
        await expect(grid.getByLabel('Option 1')).not.toBeChecked();
        expect(await grid.getByRole('radio', {name: 'Option 1'}).isChecked()).toBeFalsy();
    })

    
})

test('checkboxes fields', async ({page}) => {
    await page.getByText('Modal & Overlays').click();
    await page.getByText('Toastr').click();

    await page.getByRole('checkbox', {name: "Prevent arising of duplicate toast"}).check({force: true});
    
    const allCheckboxes = page.getByRole('checkbox');
    for (const checkbox of await allCheckboxes.all()) {
        await checkbox.uncheck({force: true});
        expect(await checkbox.isChecked()).toBeFalsy();
    }
    
})

test('dropdown fields', async ({page}) => {
    

    const dropButton = page.locator('ngx-header .select-button');
    //await dropButton.click();

    page.getByRole('list')  //when UL list - container
    
    page.getByRole('listitem')  // when list LI - array
    

    //const options = page.getByRole('list').locator('nb-option');
    const options = page.locator('nb-option-list nb-option');

    // await expect(options).toHaveCount(4);
    // await expect(options).toHaveText(["Light", "Dark", "Cosmic", "Corporate"]);

    // await options.filter({hasText: "Cosmic"}).click();

    const header = page.locator('nb-layout-header');
    
    // await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)');

    const colors = {
        "Light": 'rgb(255, 255, 255)',
        "Dark": 'rgb(34, 43, 69)',
        "Cosmic": 'rgb(50, 50, 89)',
        "Corporate": 'rgb(255, 255, 255)'
    }

    for (const color in colors) {
        await dropButton.click();
        await options.filter({hasText: color}).click();
        await expect(header).toHaveCSS('background-color', colors[color]);
    }
})

test('tooltips', async ({page}) => {
    await page.getByText('Modal & Overlays').click();
    await page.getByText('Tooltip').click();

    
    const card = page.locator('nb-card').filter({hasText: "Tooltip Placements"});

    const button = card.getByRole('button', {name: "Top"});
    await button.hover();
    
    //page.getByRole('tooltip'); //if you have a role tooltip created
    const tooltip = await page.locator('nb-tooltip').textContent();
    expect(tooltip).toEqual("This is a tooltip");
})

test('Dialog boxes', async ({page}) => {
    await page.getByText('Tables & Data').click();
    await page.getByText('Smart Table').click();

    page.on('dialog', dialog => {
            expect(dialog.message()).toContain("Are you sure you want to delete?");
            dialog.accept();
    })

    
    const row = page.locator('table tbody tr').filter({hasText: "mdo@gmail.com"});
    await row.locator('.nb-trash').click();

    await expect(row).not.toBeVisible();
    
})

test('Tables', async ({page}) => {
    await page.getByText('Tables & Data').click();
    await page.getByText('Smart Table').click();

    //1
    const table = page.locator('table');
    const theader = table.locator('thead');
    const tbody = table.locator('tbody');
    
    // const row = tbody.getByRole('row', {name: "twitter@outlook.com"});
    // await row.locator('.nb-edit').click();
    // await page.locator('input-editor').getByPlaceholder('Age').clear();
    // await page.locator('input-editor').getByPlaceholder('Age').fill('38');
    // await page.locator('.nb-checkmark').click();

    //2
    // await page.locator('.ng2-smart-pagination-nav').getByText('2').click();
    // const targetRowById = page.getByRole('row', {name: '11'}).filter({has: page.locator('td').nth(1).getByText('11')});
    // await targetRowById.locator('.nb-edit').click();
    // await page.locator('input-editor').getByPlaceholder('E-mail').clear();
    // await page.locator('input-editor').getByPlaceholder('E-mail').fill('bandurka');
    // await page.locator('.nb-checkmark').click();
    // await expect(targetRowById.locator('td').nth(5)).toContainText('bandurka');

    //3
    const ages = ["20", "30", "40", "200"];
    for (let age of ages) {
        const searchFilter = page.locator('input-filter').getByPlaceholder('Age');
        await searchFilter.clear();
        await searchFilter.fill(age);

        await page.waitForTimeout(2000);

        const ageRows = tbody.locator('tr');
        for (let row of await ageRows.all()) {
            const rowAge = await row.locator('td').last().textContent();

            if (age === "200") {
                expect(await table.textContent()).toContain("No data found");
            } else {
                expect(rowAge).toEqual(age);
            }
        }
    }

})

test('Date pickers', async ({page}) => {
    await page.getByText('Forms').click();
    await page.getByText('Datepicker').click();


    const calendarInput = page.getByPlaceholder('Form Picker');
    await calendarInput.click();

    let date = new Date();

    date.setDate(date.getDate() + 300);
    const expDate = date.getDate().toString();
    const expMonthShort = date.toLocaleString('default', {month: 'short'});
    const expMonthLong = date.toLocaleString('default', {month: 'long'});
    const expYear = date.getFullYear().toString();
    const expDateText = `${expMonthShort} ${expDate}, ${expYear}`;

    let calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent();
    const expectedMonAndYear = `${expMonthLong} ${expYear}`;

    while (!calendarMonthAndYear.includes(expectedMonAndYear)) {
        if(date < new Date()) {
            await page.locator('.prev-month').click();
        } else {
            await page.locator('.next-month').click();
        }
        calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent();
    }

    await page.locator('[class="day-cell ng-star-inserted"]').getByText(expDate, {exact: true}).click();
    
    await expect(calendarInput).toHaveValue(expDateText);
})

test('sliders', async ({page}) => {
    //Upd attribute

    // const tempGuide =  page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle');

    // await tempGuide.evaluate((el) => {
    //     el.setAttribute('cx', '232.630');
    //     el.setAttribute('cy', '232.630');
    // });
    // await tempGuide.click();
    
    //Mouse move
    const tempBox =  page.locator('[tabtitle="Temperature"] ngx-temperature-dragger');
    await tempBox.scrollIntoViewIfNeeded();

    const box = await tempBox.boundingBox();
    const x = box.x + box.width / 2;
    const y = box.y + box.height / 2;
    await page.mouse.move(x, y);
    await page.mouse.down();
    await page.mouse.move(x + 100, y);
    await page.mouse.move(x + 100, y + 150);
    await page.mouse.up();
    await page.waitForTimeout(2000);
    expect(tempBox).toContainText('30');
})

