const { expect } = require("@playwright/test");
const { fs } = require("fs");
const { chromium } = require("@playwright/test");
exports.GomoCustomerServicePage = class GomoCustomerServicePage {
  constructor(page) {
    this.page = page;
    this.fieldMobileNo = page.getByPlaceholder('Ex.0812345678')
    this.buttonGo = page.getByRole('button', { name: 'GO!' });
    this.checkVisableGomoContract = page.getByText('สวัสดีค่ะ ยินดีต้อนรับสู่ GOMO!');
  }

  async inputMobileNo (mobileNo){
    await expect(this.fieldMobileNo).toBeVisible();
    await this.fieldMobileNo.fill(mobileNo);
  }
  async clickButtonGo() {
    await expect(this.buttonGo).toBeVisible();
    await this.buttonGo.click();
    await expect(this.checkVisableGomoContract).toBeVisible();
  }
  
}