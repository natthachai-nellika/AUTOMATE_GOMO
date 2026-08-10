const { expect } = require("@playwright/test");
const fs = require("fs");
const { chromium } = require("@playwright/test");

exports.CustomerServicePage = class CustomerServicePage {
    constructor(page) {
        this.page = page;
        this.fieldText = page.getByPlaceholder('พิมพ์ข้อความมาได้เลย');
        this.buttonYes = page.locator('div', { hasText: /^ใช่$/ });
        this.buttonNo = page.locator('div', { hasText: /^ไม่ใช่$/ });
        this.buttonSubmit = page.getByText('กดที่นี่เลยค่ะ', { exact: true });
        this.buttonGo = page.locator('div.ant-form-item').getByRole('button', { type: 'submit' });
    }

    async inputNetType(NetType) {
        await this.fieldText.waitFor({ state: 'visible', timeout: 10000 });
        await expect(this.fieldText).toBeVisible();
        await this.fieldText.fill(NetType);
    }

    async clickButtonGo() {
        await expect(this.buttonGo).toBeVisible();
        await this.buttonGo.click();
    }

    async clickButtonYes() {
        await expect(this.buttonYes).toBeVisible();
        await this.buttonYes.click();
    }

    async clickButtonNo() {
        await expect(this.buttonNo).toBeVisible();
        await this.buttonNo.click();
    }

    async clickButonSubmit() {
        await expect(this.buttonSubmit).toBeVisible();
        await this.buttonSubmit.click();
}
}