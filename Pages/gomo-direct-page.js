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
}