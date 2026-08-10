const { expect } = require("@playwright/test");
const { fs } = require("fs");
const { chromium } = require("@playwright/test");
exports.CustomerServicePage = class CustomerServicePage {
  constructor(page) {
    this.page = page;
    this.fieldText = page.getByPlaceholder('พิมพ์ข้อความมาได้เลย');
    this.buttonYes = page.page.getByText('ใช่');
    this.buttonNo = page.page.getByText('ไม่');
    this.buttonGo = page.page.locator('div.ant-form-item').getByRole('button', { type: 'submit' });
  }

  async inputNetType (NetType){
    await expect(this.fieldText).toBeVisible();
    await this.fieldText.fill(NetType);
  }
  async clickButtonGo() {
    await expect(this.buttonGo).toBeVisible();
    await this.buttonGo.click();
    await expect(this.checkVisableGomoContract).toBeVisible();
  }
  async clickButtonYes (){
    await expect(this.buttonYes).toBeVisible();
    await this.buttonYes.click();
  }
  async clickButtonNo(){
    await expect(this.buttonNo).toBeVisible();
    await this.buttonNo.click();
  }

  
}