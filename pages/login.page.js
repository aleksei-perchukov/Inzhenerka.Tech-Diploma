import test from '@playwright/test';
import { MainPage } from './main.page';

export class LoginPage {
    constructor(page) {
        this.page = page;
        this.loginField = page.locator('[name="login"]');
        this.passwordField = page.locator('[name="pass"]');
        this.button = page.locator('[type="button"]')
    }

    async login(login, password) {
        await test.step(`Login with '${login}' email & '${password}' password`, async () => {
            await this.loginField.fill(login);
            await this.passwordField.fill(password);
            await this.button.click();
        });
    }
}