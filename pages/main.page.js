import test from '@playwright/test';

export class MainPage {
    constructor(page) {
        this.page = page;
        this.userName = page.locator('h2').first();
        this.tableTopToggle = page.getByTestId('hide-countertop');
        this.showTableTopTitle = page.getByTestId('show-main');
        this.pShapedButton = page.getByTestId('countertop-type-u');
        this.tableTopType = page.getByTestId('order-list').locator('h4').first();
        this.thickness = page.getByTestId('select-thickness');
        this.plinth = page.getByTestId('top-button').getByText('Плинтус');
        this.island = page.getByTestId('product-item').getByText('Остров');
        this.water = page.getByTestId('options-item').getByText('Проточки для стока воды');
        this.colors = page.getByTestId('stone-block');
        this.calculateButton = page.getByTestId('calc-button');
        this.reportButton = page.getByTestId('open-report-button');
    }

    async hideTableTop() {
        test.step('Click on "Hide TableTop" button', async () => {
            await this.tableTopToggle.click();
        })
    };

    async selectPShaped() {
        test.step('Click on "P-Shaped" button', async () => {
            await this.pShapedButton.click();
        })
    };

    async selectThickness(thicknessValue) {
        test.step(`Select '${thicknessValue}' width`, async () => {
            this.thickness.first().click();
            this.thickness.getByText(`${thicknessValue}`).click();
        });
    }

    async removePlinth() {
        test.step(`Click on 'Plinth' button`, async () => {
            await this.plinth.click();
        })
    };

    async addIsland() {
        test.step(`Click on 'Island' button`, async () => {
            await this.island.click();
        })
    };

    async addWaterDrainage() {
        test.step(`Add 'Water drainage' option`, async () => {
            await this.water.click();
        })
    };

    async selectColor(colorValue) {
        test.step(`Select '${colorValue}' color`, async () => {
            await this.colors.getByText(`${colorValue}`).click();
        });
    }

    async clickCalculateButton() {
        test.step('Click on "Calculate" button', async () => {
            await this.calculateButton.click();
        })
    }

    async clickReportButton() {
        test.step(`Click on 'Report' button`, async () => {
            
            await this.reportButton.click();
        })
    }
}
