import { expect, test } from '@playwright/test';

export class MainPage {
    constructor(context, page) {
        this.page = page;
        this.context = context;
        this.userName = page.locator('[class^="style_workerInfo__"]').first();
        this.tableTopToggle = page.getByTestId('hide-countertop').locator('img');
        this.showTableTopTitle = page.getByTestId('show-main');
        this.pShapedButton = page.getByTestId('countertop-type-u');
        this.tableTopType = page.getByTestId('order-list').locator('h4').first();
        this.thickness = page.getByTestId('select-thickness');
        this.thicknessAssert = page.locator('button[class*="styles_selectBlockClose"]').first();
        this.plinth = page.getByTestId('top-button').getByText('Плинтус');
        this.plinthAssert = page.locator('[data-testid="edge-or-plinth"]');
        this.island = page.getByTestId('product-item').getByText('Остров');
        this.islandAssert = page.locator('[data-testid="island"]');
        this.water = page.getByTestId('options-item').getByText('Проточки для стока воды');
        this.waterAssert = page.locator('[data-testid="order-list"] > ul > li:nth-child(1)').nth(2);
        this.colors = page.getByTestId('stone-block');
        this.colorAssert = page.locator('[data-testid="order-list"] > ul > li:nth-child(2)').first()
        this.orderList = page.getByTestId('order-list');
        this.calculateButton = page.getByTestId('calc-button');
        this.reportButton = page.getByTestId('open-report-button');
    }

    async checkLoginName() {
        await test.step('Check user is logged in', async () => {
            const userName = process.env.LOGIN[0].toUpperCase() + process.env.LOGIN.substring(1, 6);
            await expect.soft(this.orderList, `Check order list is visible`).toBeVisible({ timeout: 20000 });
            await expect.soft(this.userName, `Check username is '${userName}'`).toHaveText(userName, { timeout: 20000 });
        })
    }

    async hideTableTop() {
        await test.step('Click on "Hide TableTop" button', async () => {
            await expect.soft(this.showTableTopTitle, "Check 'Show TableTop' title is not visible").toBeHidden({ timeout: 20000 });
            await this.tableTopToggle.click();
            await expect.soft(this.showTableTopTitle, "Check 'Show TableTop' title is visible").toBeVisible({ timeout: 20000 });
        })
    }

    async selectPShaped() {
        await test.step('Click on "P-Shaped" button', async () => {
            const tableTopText = 'П-образная столешница';
            await this.pShapedButton.click({ timeout: 20000 });
            await expect.soft(this.tableTopType, `Check '${tableTopText}' title is visible`).toHaveText(tableTopText, { timeout: 20000 });
        })
    }

    async selectThickness(thicknessValue) {
        await test.step(`Select '${thicknessValue}' width`, async () => {
            await this.thickness.first().click();
            await this.thickness.getByText(`${thicknessValue}`).click();
            await expect.soft(this.thicknessAssert, `Check thickness is ${thicknessValue}`).toHaveText(thicknessValue.toString(), { timeout: 20000 });
        })
    }

    async removePlinth() {
        await test.step(`Click on 'Plinth' button`, async () => {
            await this.plinth.click();
            expect.soft(this.plinthAssert, `Check plinth is removed`).toHaveCount(5, { timeout: 20000 });
        })
    }

    async addIsland() {
        await test.step(`Add 'Island' option`, async () => {
            await this.island.click();
            await expect.soft(this.islandAssert, `Check 'Island' option is added`).toBeVisible({ timeout: 20000 });
        })
    }

    async addWaterDrainage() {
        await test.step(`Add 'Water drainage' option`, async () => {
            const text = 'Проточки для стока воды';
            await this.water.click();
            await expect.soft(this.waterAssert, `Check 'Water drainage' option is added`).toHaveText(text, { timeout: 20000 });
        })
    }

    async selectColor(colorValue) {
        await test.step(`Select '${colorValue}' color`, async () => {
            await this.colors.getByText(`${colorValue}`).click();
            await expect.soft(this.colorAssert, `Check color is ${colorValue}`).toContainText(colorValue, { timeout: 20000 });
        })
    }

    async clickCalculateButton() {
        await test.step('Click on "Calculate" button', async () => {
            const text = 'Расчет';
            await this.calculateButton.click({ timeout: 20000 });
            await this.page.waitForTimeout(7000);
            await expect.soft(this.reportButton, `Check '${text}' button is clickable`).toHaveText('Расчет', { timeout: 20000 });
        })
    }

    async clickReportButton() {
        await test.step(`Click on 'Report' button and open summary page`, async () => {
            await this.reportButton.dblclick({ timeout: 20000, force: true });
        });
    }

    async goToSummaryPage() {
        const newPagePromise = this.context.waitForEvent('page', { timeout: 20000 });
        await this.clickReportButton();
        const newPage = await newPagePromise;
        await newPage.waitForLoadState();
        return await newPage;
    }
}
