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
})

test.describe('dev.topklik.online', async () => {
    test('1. Authorization', async ({ context, page }) => {
        await allure.owner('Aleksei Perchukov');
        await allure.tags('Positive', 'Login Page');
        await allure.feature("Authentication");

        const mainPage = new MainPage(context, page);
        await mainPage.checkLoginName();
    });

    test('2. "Hide tabletop" test', async ({ context, page }) => {
        await allure.owner('Aleksei Perchukov');
        await allure.tags('Positive', 'Main Page');
        await allure.feature("Table Constructor");

        const mainPage = new MainPage(page);
        await mainPage.hideTableTop();
    });

    test('3. Switch "P-shaped tabletop" toggle', async ({ context, page }) => {
        await allure.owner('Aleksei Perchukov');
        await allure.tags('Positive', 'Main Page');
        await allure.feature("Table Constructor");

        const text = 'П-образная столешница';

        const mainPage = new MainPage(context, page);
        await mainPage.selectPShaped();
        await expect.soft(mainPage.tableTopType, `Check ${text} title is visible`).toHaveText(text);
    });

    test('4. E2E test', async ({ context, page }) => {
        await allure.owner('Aleksei Perchukov');
        await allure.tags('Positive', 'Main Page', 'E2E');
        await allure.feature("Table Constructor");

        const thickness = 4;
        const color = 'N-103 Gray Onix';
        const mainPage = new MainPage(context, page);

        await mainPage.selectPShaped();
        await mainPage.selectThickness(thickness.toString());
        await mainPage.removePlinth();
        await mainPage.addIsland();
        await mainPage.addWaterDrainage();
        await mainPage.selectColor(color);
        await mainPage.clickCalculateButton();
        const newPage = await mainPage.goToSummaryPage();
        await test.step(`Switch on new tab`, async () => {
            await newPage.bringToFront();
        });
        const calculationPage = new CalculationPage(newPage);
        const material = 'acryl:Neomarm:N-103 Gray Onix';
        const tableTopType = 'П-образная';
        const option = 'Проточки для стока воды';
        const total = '500000.00 ₽';

        expect.soft(await calculationPage.materialValue, `Check material/color are ${material}`).toContainText(material, { timeout: 20000 });
        expect.soft(await calculationPage.tableTopTypeValue, `Check table top type is ${tableTopType}`).toHaveText(tableTopType, { timeout: 20000 });
        expect.soft(await calculationPage.optionsValue, `Check options include '${option}'`).toContainText(option, { timeout: 20000 });
        expect.soft(await calculationPage.total, `Check total is ${total}`).toContainText(total, { timeout: 20000 });
    });
});
