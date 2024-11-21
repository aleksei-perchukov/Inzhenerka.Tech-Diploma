import test from '@playwright/test';

export class LoginPage {

    constructor(page) {
        this.page = page;
        this.loginField = page.locator('[name="login"]');
        this.passwordField = page.locator('[name="pass"]');
        this.button = page.locator('[type="button"]');
    }

    async login() {
        const login = process.env.LOGIN;
        const password = process.env.PASSWORD;
        await test.step(`Login with '${login}' email & '${password}' password`, async () => {
            await this.page.waitForTimeout(500);
            await this.loginField.fill(login);
            await this.page.waitForTimeout(500);
            await this.passwordField.fill(password);
            await this.page.waitForTimeout(500);
            await this.button.dblclick({timeout: 20000, force: true});
            await this.page.waitForTimeout(1000);
        })
    }
}
