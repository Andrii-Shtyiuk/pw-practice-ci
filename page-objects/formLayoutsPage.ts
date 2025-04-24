import { Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';

export class FormLayoutsPage extends BasePage {

    constructor(page: Page) {
        super(page)
    }

    async submitFormWithCredentials(email: string, password: string, optionText: string) {
        const gridForm = this.page.locator('nb-card', {hasText: "Using the Grid"})
        await gridForm.getByRole('textbox', {name: "Email"}).fill(email)
        await gridForm.getByRole('textbox', {name: "Password"}).fill(password)

        await gridForm.getByRole('radio', {name: optionText}).check({force: true})
        await gridForm.getByRole('button', {name: "Sign in"}).click()
    }

    /**
     * Method fills out inline form with user details
     * @param name - should be first and last name
     * @param email - unique email for the user
     * @param rememberMe - true or false is user session should be saved
     */
    async submitInlineForm(name: string, email: string, rememberMe: boolean) {
        const inlineForm = this.page.locator('nb-card', {hasText: "Inline form"})
        await inlineForm.getByRole('textbox', {name: "Jane Doe"}).fill(name)
        await inlineForm.getByRole('textbox', {name: "Email"}).fill(email)
        if (rememberMe) {
            await inlineForm.getByRole('checkbox').check({force: true})
        }
        await inlineForm.getByRole('button', {name: "Submit"}).click()
    }
}