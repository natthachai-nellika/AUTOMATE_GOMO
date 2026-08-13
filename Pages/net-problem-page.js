const { expect } = require("@playwright/test");

exports.NetPage = class NetPage {
    constructor(page) {
        this.page = page;
        this.buttonVerify = page.getByText('ตรวจสอบ', { exact: true });
        this.dropdownProblem = page.locator('.ant-select-selector');
        this.inputDate = page.locator('#date');
        this.inputTime = page.locator('#time');
        this.buttonConfirm = page.getByRole('button', { name: 'ยืนยัน' });
        this.buttonReport = page.locator('.ant-modal-footer button').filter({ hasText: 'แจ้งปัญหา' });
        this.buttonClose = page.locator('.ant-modal-footer button').filter({ hasText: 'ปิด' });

    }

    async clickButtonVerify() {
        await this.buttonVerify.waitFor({ state: 'visible', timeout: 10000 });
        await this.buttonVerify.click();
    }

    async selectProblemType(optionText) {
        await this.dropdownProblem.waitFor({ state: 'visible', timeout: 10000 });
        await this.dropdownProblem.click();

        const option = this.page.getByTitle(optionText, { exact: true });
        await option.waitFor({ state: 'visible' });
        await option.click();
    }

    async selectDate(dateNumber = '10') {
        await this.inputDate.waitFor({ state: 'visible', timeout: 10000 });
        await this.inputDate.click();

        const dateCell = this.page.locator('.ant-picker-cell-inner').filter({ hasText: new RegExp(`^${dateNumber}$`) });
        await dateCell.waitFor({ state: 'visible' });
        await dateCell.click();
    }

    async selectTime(hourStr = '05', minuteStr = '02') {
        await this.inputTime.waitFor({ state: 'visible', timeout: 10000 });
        await this.inputTime.click();
        await this.page.waitForTimeout(500);
        const hourOption = this.page.locator('.ant-picker-time-panel-column').first()
            .locator('.ant-picker-time-panel-cell-inner')
            .filter({ hasText: new RegExp(`^${hourStr}$`) });
        await hourOption.scrollIntoViewIfNeeded();
        await hourOption.click({ force: true });
        const minuteOption = this.page.locator('.ant-picker-time-panel-column').last()
            .locator('.ant-picker-time-panel-cell-inner')
            .filter({ hasText: new RegExp(`^${minuteStr}$`) });
        await minuteOption.scrollIntoViewIfNeeded();
        await minuteOption.click({ force: true });

        const btnOk = this.page.locator('.ant-picker-ok button');
        await btnOk.waitFor({ state: 'visible', timeout: 5000 });
        await btnOk.click();
        await this.page.waitForTimeout(500);
    }

    async clickButtonConfirm() {
        const btnConfirm = this.page.locator('button[type="submit"]').filter({ hasText: 'ยืนยัน' });
        await btnConfirm.waitFor({ state: 'visible', timeout: 10000 });
        await btnConfirm.click({ force: true });
        await this.page.waitForTimeout(2000);
    }

    async clickButtonReport() {
        await this.buttonReport.waitFor({ state: 'visible', timeout: 10000 });
        await this.buttonReport.click();
    }

    async clickLinkApp() {
        const linkClick = this.page.locator('strong.modal-label-status-network-used-normally').filter({ hasText: 'คลิก' });

        const [appTab] = await Promise.all([
            this.page.waitForEvent('popup'),
            linkClick.click()
        ]);

        await appTab.waitForLoadState();
        return appTab;
    }
    async clickButtonClose() {
        await this.buttonClose.waitFor({ state: 'visible', timeout: 10000 });
        await this.buttonClose.click();
    }

}