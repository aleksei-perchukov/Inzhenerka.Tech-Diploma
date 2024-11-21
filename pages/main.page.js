import { expect, test } from '@playwright/test';

export class MainPage {
    constructor(page) {
        this.page = page;
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
            await expect.soft(await this.orderList).toBeVisible();
            await expect(await this.userName, `Check username is '${userName}'`).toHaveText(userName);
        })
    }

    async hideTableTop() {
        await test.step('Click on "Hide TableTop" button', async () => {
            await expect.soft(this.showTableTopTitle, "Check 'Show TableTop' title is not visible").toBeHidden();
            await this.tableTopToggle.click();
            await expect.soft(await this.showTableTopTitle, "Check 'Show TableTop' title is visible").toBeVisible();
        })
    }

    async selectPShaped() {
        await test.step('Click on "P-Shaped" button', async () => {
            const tableTopText = 'П-образная столешница';
            await this.pShapedButton.click();
            await expect.soft(await this.tableTopType, `Check ${tableTopText} title is visible`).toHaveText(tableTopText);
        })
    }

    async selectThickness(thicknessValue) {
        await test.step(`Select '${thicknessValue}' width`, async () => {
            await this.thickness.first().click();
            await this.thickness.getByText(`${thicknessValue}`).click();
            await expect.soft(await this.thicknessAssert, `Check thickness is ${thicknessValue}`).toHaveText(thicknessValue.toString());
        })
    }

    async removePlinth() {
        await test.step(`Click on 'Plinth' button`, async () => {
            await this.plinth.click();
            expect.soft(await this.plinthAssert, `Check plinth is removed`).toHaveCount(5);
        })
    }

    async addIsland() {
        await test.step(`Add 'Island' option`, async () => {    
            await this.island.click();
            await expect.soft(await this.islandAssert, `Check 'Island' option is added`).toBeVisible();
        })
    }

    async addWaterDrainage() {
        await test.step(`Add 'Water drainage' option`, async () => {
            const text = 'Проточки для стока воды';
            await this.water.click();
            await expect.soft(await this.waterAssert, `Check 'Water drainage' option is added`).toHaveText(text);
        })
    }

    async selectColor(colorValue) {
        await test.step(`Select '${colorValue}' color`, async () => {
            await this.colors.getByText(`${colorValue}`).click();
            await expect.soft(await this.colorAssert, `Check color is ${colorValue}`).toContainText(colorValue);
        })
    }

    async clickCalculateButton() {
        await test.step('Click on "Calculate" button', async () => {
            const text = 'Расчет';
            await this.page.waitForTimeout(2000);
            await this.calculateButton.click();
            await this.page.waitForTimeout(10000);
            await expect(this.reportButton, `Check '${text}' button is clickable`).toHaveText('Расчет');
        })
    }

    async clickReportButton() {
        await test.step(`Click on 'Report' button`, async () => {
            await this.reportButton.click();
        })
    }
}
