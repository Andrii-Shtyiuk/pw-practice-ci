import { Locator, Page } from '@playwright/test';
import {GroupItem} from '../utils/groupItems';
import { BasePage } from './basePage';

export class NavBar extends BasePage {

    readonly formLayoutsItem: Locator
    readonly datepickerItem: Locator
    readonly smartTableItem: Locator
    readonly toastrItem: Locator
    readonly tooltipItem: Locator

    constructor(page: Page) {
        super(page)
        this.formLayoutsItem = page.getByText('Form Layouts');
        this.datepickerItem = page.getByText('Datepicker');
        this.smartTableItem = page.getByText('Smart Table');
        this.toastrItem = page.getByText('Toastr');
        this.tooltipItem = page.getByText('Tooltip');
    }

    async navigateToFormsLayoutsPage() {
        await this.selectGroupItem(GroupItem.FORMS);
        await this.formLayoutsItem.click();
    }

    async navigateToDatepickerPage() {
        await this.selectGroupItem(GroupItem.FORMS);
        await this.datepickerItem.click();
    }

    async navigateToTablePage() {
        await this.selectGroupItem(GroupItem.TABLES_DATA);
        await this.smartTableItem.click();
    }

    async navigateToToastrPage() {
        await this.selectGroupItem(GroupItem.MODAL_OVERLAYS);
        await this.toastrItem.click();
    }

    async navigateToTooltipPage() {
        await this.selectGroupItem(GroupItem.MODAL_OVERLAYS);
        await this.tooltipItem.click();
    }

    private async selectGroupItem(groupItem: GroupItem) {
        const groupMenuItem = this.page.getByTitle(groupItem);
        const expandedState = await groupMenuItem.getAttribute('aria-expanded');
        if (expandedState == "false") {
            await groupMenuItem.click();
        }
    }
}