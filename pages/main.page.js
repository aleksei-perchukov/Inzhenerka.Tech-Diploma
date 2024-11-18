import test from '@playwright/test';

export class MainPage {
    constructor(page) {
        this.page = page;
        this.userName = page.locator('h2').first();
        this.tableTopToggle = page.locator('#hide-countertop');
        this.button = page.locator('')
    }
}