const { expect } = require("@playwright/test");
const { fs } = require("fs");
const { chromium } = require("@playwright/test");

exports.GomoPage = class GomoPage {
  constructor(page) {
    this.page = page;
  }

  async gotoGomoPage() {
    if (process.env.NODE_ENV === "local") {
      this.gotoLogin();
    } else {
      await this.page.goto(
        "https://sit-askaunjai.cdc.ais.th/v2/gomo"
      );
    }
  }
  async gotoInternetProblemPage1() {
    if (process.env.NODE_ENV === "local") {
      this.gotoLogin();
    } else {
      await this.page.goto(
        "https://sit-askaunjai.cdc.ais.th/v2/internet-problem?userId=20260810024936nJZxo5F7lSp1MOWGR7GFnTB1lzGzV9oV&mobileNo=0937056746&type=internet"
      );
    }
  }
    async gotoInternetProblemPage2() {
    if (process.env.NODE_ENV === "local") {
      this.gotoLogin();
    } else {
      await this.page.goto(
        "https://sit-askaunjai.cdc.ais.th/v2/internet-problem?type=voice"
      );
    }
  }
}