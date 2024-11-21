export class CalculationPage {
    constructor(page) {
        this.page = page;
        this.table = page.locator('.table');
        this.materialValue = page.locator(`//td[contains(text(), 'Материал')]/following-sibling::td[@class='col-2'][1]`);
        this.tableTopTypeValue = page.locator(`//td[contains(text(), 'Тип столешницы')]/following-sibling::td[@class='col-2'][1]`);
        this.optionsValue = page.locator(`//h3[contains(text() , 'Расчет работ')]/following-sibling::h4[1]/following-sibling::table[1]/tbody[1]/tr[3]/td[2]`);
        // this.total = page.locator(`//td[contains(text(), 'Стоимость итоговая')]/following-sibling::td[3]`);
        this.total = page.locator(`td:nth-last-child(1)`).last();
    }
}
