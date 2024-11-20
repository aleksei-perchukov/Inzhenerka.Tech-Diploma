import { expect, test } from '@playwright/test';

export class MainPage {
    constructor(page) {
        this.page = page;
        this.userName = page.locator('[class^="style_workerInfo__"]').first();
        this.tableTopToggle = page.getByTestId('hide-countertop');
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
        test.step('Check user is logged in', async () => {
            const userName = process.env.LOGIN[0].toUpperCase() + process.env.LOGIN.substring(1, 6);
            await expect(this.orderList).toBeVisible();
            await expect(this.userName, `Check username is '${userName}'`).toHaveText(userName);
        });
    }

    async hideTableTop() {
        test.step('Click on "Hide TableTop" button', async () => {
            await expect(this.showTableTopTitle, "Check 'Show TableTop' title is not visible").toBeHidden();
            await this.tableTopToggle.click();
            await expect(this.showTableTopTitle, "Check 'Show TableTop' title is visible").toBeVisible();
        })
    };

    async selectPShaped() {
        test.step('Click on "P-Shaped" button', async () => {
            const tableTopText = 'П-образная столешница';
            await this.page.waitForTimeout(2000);
            await this.pShapedButton.click();
            await expect(this.tableTopType, `Check ${tableTopText} title is visible`).toHaveText(tableTopText);
        })
    };

    async selectThickness(thicknessValue) {
        test.step(`Select '${thicknessValue}' width`, async () => {
            this.thickness.first().click();
            this.thickness.getByText(`${thicknessValue}`).click();
            await expect(this.thicknessAssert, `Check thickness is ${thicknessValue}`).toHaveText(thicknessValue.toString());
        });
    }

    async removePlinth() {
        test.step(`Click on 'Plinth' button`, async () => {
            await this.page.waitForTimeout(2000);
            await this.plinth.click();
            await expect(this.plinthAssert, `Check plinth is removed`).toHaveCount(5);
        })
    };

    async addIsland() {
        test.step(`Add 'Island' option`, async () => {
            await this.island.click();
            await expect(this.islandAssert, `Check 'Island' option is added`).toBeVisible();
        })
    };

    async addWaterDrainage() {
        test.step(`Add 'Water drainage' option`, async () => {
            const text = 'Проточки для стока воды';
            await this.page.waitForTimeout(1000);
            await this.water.click();
            await expect(this.waterAssert, `Check 'Water drainage' option is added`).toHaveText(text);
        })
    };

    async selectColor(colorValue) {
        test.step(`Select '${colorValue}' color`, async () => {
            await this.colors.getByText(`${colorValue}`).click();
            await expect(this.colorAssert, `Check color is ${colorValue}`).toContainText(colorValue);
        });
    }

    async clickCalculateButton() {
        test.step('Click on "Calculate" button', async () => {
            const text = 'Расчет';
            await this.page.waitForTimeout(2000);
            await this.calculateButton.click();
            await expect(this.reportButton, `Check '${text}' button is clickable`).toHaveText('Расчет');
        })
    }

    async clickReportButton() {
        test.step(`Click on 'Report' button`, async () => {
            await this.reportButton.click();
        })
    }
}
