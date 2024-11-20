import test from '@playwright/test';

export class CalculationPage {
    constructor(page) {
        this.page = page;
        this.table = page.locator('.table');
        this.materialValue = page.locator(`//td[contains(text(), 'Материал')]//td[class='col-2']`);
        this.topTableTypeValue = page.locator(`//td[contains(text(), 'Тип столешницы')]//td[class='col-2']`);
        this.optionsValue = page.locator(`//td[contains(text() , 'Расчет работ')]//td[class='col-5'][1]`);
        this.total = page.locator(`//td[contains(text(), 'Стоимость итоговая')]//td[class='col-2'][2]`);
    }
}
