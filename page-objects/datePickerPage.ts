import { Page , expect} from '@playwright/test';
import { BasePage } from './basePage';

export class DatePickerPage extends BasePage {

    constructor(page: Page) {
        super(page)
    }

    async selectCommonDatefromToday(myDate: Date) {
        const calendarInput = this.page.getByPlaceholder('Form Picker');
        await calendarInput.click();

        const expectedDate = await this.selectDateInCalendar(myDate);
        
        
        await expect(calendarInput).toHaveValue(expectedDate);
    }

    async selectDateRange(fromDate: Date, toDate: Date) {
        const calendarInput = this.page.getByPlaceholder('Range Picker');
        await calendarInput.click();
        
        const fromDateText = await this.selectDateInCalendar(fromDate);
        const toDateText = await this.selectDateInCalendar(toDate);

        await expect(calendarInput).toHaveValue(`${fromDateText} - ${toDateText}`);
    }

    private async selectDateInCalendar(myDate: Date) {
        const expDate = myDate.getDate().toString();
        const expMonthShort = myDate.toLocaleString('default', {month: 'short'});
        const expMonthLong = myDate.toLocaleString('default', {month: 'long'});
        const expYear = myDate.getFullYear().toString();
        const expDateText = `${expMonthShort} ${expDate}, ${expYear}`;

        let calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent();
        const expectedMonAndYear = `${expMonthLong} ${expYear}`;

        while (!calendarMonthAndYear.includes(expectedMonAndYear)) {
            if(myDate < new Date()) {
                await this.page.locator('.prev-month').click();
            } else {
                await this.page.locator('.next-month').click();
            }
            calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent();
        }

        await this.page.locator('.day-cell.ng-star-inserted:not(.bounding-month)').getByText(expDate, {exact: true}).click();
        return expDateText
    }
}