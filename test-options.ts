import {test as base} from '@playwright/test'

export type TestOptions = {
    globalSqaUrl: string,
    waitingUrl: string
}

export const test = base.extend<TestOptions>({
    globalSqaUrl: ['', {option: true}],
    waitingUrl: ['', {option: true}]
})