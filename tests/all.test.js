import { expect, test } from '@playwright/test';
import * as allure from "allure-js-commons";
import { CalculationPage } from '../pages/calculation.page';
import { LoginPage } from '../pages/login.page';
import { MainPage } from '../pages/main.page';

test.beforeEach('Login', async ({ page }) => {
    await test.step(`Open page`, async () => {
        await page.goto('/');
        const loginPage = new LoginPage(page);
        await loginPage.login();
    });
});

test.describe('dev.topklik.online', async () => {
    test('1. Authorization', async ({ page }) => {
        await allure.owner('Aleksei Perchukov');
        await allure.tags('Positive', 'Login Page');
        await allure.feature("Authentication");

        const mainPage = new MainPage(page);
        const userName = process.env.LOGIN[0].toUpperCase() + process.env.LOGIN.substring(1, 6);
        await expect(mainPage.userName, `Check username is '${userName}'`).toHaveText(userName);
    });

    test('2. "Hide tabletop" test', async ({ page }) => {
        await allure.owner('Aleksei Perchukov');
        await allure.tags('Positive', 'Main Page');
        await allure.feature("Table Constructor");

        const mainPage = new MainPage(page);
        await expect(mainPage.showTableTopTitle, "Check 'Show TableTop' title is not visible").toBeHidden();
        await mainPage.hideTableTop();
        await expect(mainPage.showTableTopTitle, "Check 'Show TableTop' title is visible").toBeVisible();
    });

    test('3. Switch "P-shaped tabletop" toggle', async ({ page }) => {
        await allure.owner('Aleksei Perchukov');
        await allure.tags('Positive', 'Main Page');
        await allure.feature("Table Constructor");

        const text = 'П-образная столешница';

        const mainPage = new MainPage(page);
        await mainPage.selectPShaped();
        await expect(mainPage.tableTopType, `Check ${text} title is visible`).toHaveText(text);
    });

    test('4. E2E test', async ({ context, page }) => {
        await allure.owner('Aleksei Perchukov');
        await allure.tags('Positive', 'Main Page', 'E2E');
        await allure.feature("Table Constructor");

        const thickness = 4;
        const color = 'N-103 Gray Onix';
        const mainPage = new MainPage(page);

        await page.waitForTimeout(1000);
        await mainPage.selectPShaped();
        await page.waitForTimeout(1000);
        await mainPage.selectThickness(thickness);
        await page.waitForTimeout(1000);
        await mainPage.removePlinth();
        await page.waitForTimeout(1000);
        await mainPage.addIsland();
        await page.waitForTimeout(1000);
        await mainPage.addWaterDrainage();
        await page.waitForTimeout(1000);
        await mainPage.selectColor(color);
        await page.waitForTimeout(1000);
        await mainPage.clickCalculateButton();
        await page.waitForTimeout(1000);

        const newPagePromise = context.waitForEvent('page', { timeout: 20000 });
        await mainPage.clickReportButton();
        await page.waitForTimeout(1000);
        const newPage = await newPagePromise;
        await newPage.waitForLoadState();

        await newPage.bringToFront();
        const calculationPage = new CalculationPage(newPage);
        const material = 'acryl:Neomarm:N-103 Gray Onix';
        const tableTopType = 'П-образная';
        const option = 'Проточки для стока воды';
        const total = '499200.00 ₽';
        await expect(calculationPage.materialValue, `Check material/color are ${material}`).toContainText(material);
        await expect(calculationPage.tableTopTypeValue, `Check table top type is ${tableTopType}`).toHaveText(tableTopType);
        await expect(calculationPage.optionsValue, `Check options include '${option}'`).toContainText(option);
        await expect(calculationPage.total, `Check total is ${total}`).toContainText(total);
    });
});
