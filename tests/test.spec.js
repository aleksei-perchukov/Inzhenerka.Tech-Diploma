import { expect, test } from '@playwright/test';
import * as allure from "allure-js-commons";
import { LoginPage } from '../pages/login.page';
import { MainPage } from '../pages/main.page';

test.beforeEach('Inzhenerka.Tech Diploma tests - Aleksei Perchukov', async ({ page }) => {
    await test.step(`Open page`, async () => {
        await page.goto('/');
    });
});

test.describe('dev.topklik.online', async () => {
    test('1. Authorization', async ({ page }) => {
        await allure.owner('Aleksei Perchukov');
        await allure.tags('Positive', 'Login Page');
        await allure.feature("Authentication");
        const login = process.env.LOGIN;
        const password = process.env.PASSWORD;
        const userName = process.env.LOGIN[0].toUpperCase() + process.env.LOGIN.substring(1, 6);
        const loginPage = new LoginPage(page);
        await loginPage.login(login, password);
        const mainPage = new MainPage(page);
        await expect(mainPage.userName, `Check username is '${userName}'`).toHaveText(userName);
    });

    test('2. "Hide tabletop" test', async ({ page }) => {
        await allure.owner('Aleksei Perchukov');
        await allure.tags('Positive', 'Main Page');
        await allure.feature("Table Constructor");


    });

    test('3. Switch "P-shaped tabletop" toggle', async ({ page }) => {
        await allure.owner('Aleksei Perchukov');
        await allure.tags('Positive', 'Main Page');
        await allure.feature("Table Constructor");

    });

    test('4. E2E test', async () => {
        await allure.owner('Aleksei Perchukov');
        await allure.tags('Positive', 'Main Page', 'E2E');
        await allure.feature("Table Constructor");

    });
});