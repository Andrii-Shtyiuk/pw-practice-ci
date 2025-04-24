import { Page , expect} from '@playwright/test';
import { NavBar } from '../page-objects/navBar';
import { FormLayoutsPage } from '../page-objects/formLayoutsPage';
import { DatePickerPage } from '../page-objects/datePickerPage';

export class PageManager {

    private readonly page: Page
    private readonly navBar: NavBar
    private readonly formLayoutsPage: FormLayoutsPage
    private readonly datePickerPage: DatePickerPage

    constructor(page: Page) {
        this.page = page
        this.navBar = new NavBar(this.page)
        this.formLayoutsPage = new FormLayoutsPage(this.page)
        this.datePickerPage = new DatePickerPage(this.page)
    }

    getNavBar() {
        return this.navBar
    }

    getFormLayoutsPage() {
        return this.formLayoutsPage
    }

    getDatePickerPage() {
        return this.datePickerPage
    }
}