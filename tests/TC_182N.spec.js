const { test, expect } = require('@playwright/test')
const fs = require('fs/promises')
const path = require('path')
const { CommonTool } = require('../Common/common-page')

const { GomoCustomerServicePage } = require('../Pages/gomo-customer-service')
const { CustomerServicePage } = require('../Pages/customer-service')
const { GomoPage } = require('../Pages/gomo-direct-page')
const { VoicePage } = require('../Pages/voice-problem-page')
const { NetPage } = require('../Pages/net-problem-page')

const testData = {
    MobileNo: '0937056744',
    NetType: '^Test_PBL_NET$',
}

const logAndTimeStamp = message => {
    const date = new Date();
    const bangkokTime = date.toLocaleString("en-US", {
        timeZone: "Asia/Bangkok"
    });
    console.log(message, bangkokTime)
}

test.use({
    video: 'on',
    viewport: null
})

test.describe('TC_182N.spec', async () => {
    logAndTimeStamp('TC_182N.spec')
    test.setTimeout(600000)
    test.slow()

    test('GOMO', async () => {
        const commonTool = new CommonTool('GOMO-TC182N')
        commonTool.setTitleflowVideo('GOMO')

        let { browser, page } = await commonTool.createPageWithFakeVideo(
            '../resources/temp-fake-video.y4m',
            'GOMO'
        )

        const gomoCustomerService = new GomoCustomerServicePage(page)
        const customerService = new CustomerServicePage(page)
        const gomo = new GomoPage(page)

        await test.step('Gomo Page', async () => {
            logAndTimeStamp('Login Page')
            await gomo.gotoGomoPage();
            await page.waitForTimeout(3000)
            await commonTool.takeScreenshot(page, 'GOMO', '1-GOMO Page')
            await gomoCustomerService.inputMobileNo(testData.MobileNo);
            await page.waitForTimeout(3000)
            await commonTool.takeScreenshot(page, 'GOMO', '2-Field Mobile No')
            await gomoCustomerService.clickButtonGo();
            await page.waitForTimeout(3000)
            await commonTool.takeScreenshot(page, 'GOMO', '3-Click Button Go')
        })

        await test.step('Gomo Customer Service Page', async () => {
            logAndTimeStamp('Gomo Customer Service Page')
            await customerService.inputNetType(testData.NetType);
            await page.waitForTimeout(3000)
            await customerService.clickButtonGo();
            await page.waitForTimeout(10000)
            await commonTool.takeScreenshot(page, 'GOMO', '4-Net Type')
            await customerService.clickButtonYes();
            await page.waitForTimeout(10000)
            await commonTool.takeScreenshot(page, 'GOMO', '5-Click Yes')
        })

        await test.step('NET Problem Page (New Tab)', async () => {
            logAndTimeStamp('NET Problem Page')
            const [newTab] = await Promise.all([
                page.waitForEvent('popup'),
                customerService.clickButonSubmit()
            ]);

            await newTab.waitForLoadState();

            const net = new NetPage(newTab);
            await commonTool.takeScreenshot(newTab, 'GOMO', '6-ProblemPage');
            await net.clickButtonVerify();
            
            await net.selectProblemType('อินเทอร์เน็ตใช้งานไม่ได้');
            
            await newTab.waitForTimeout(3000);
            await net.selectDate('10');
            await net.selectTime('03', '37');
            await commonTool.takeScreenshot(newTab, 'GOMO', '7-ProblemPage');
            await newTab.waitForTimeout(3000);
            await net.clickButtonConfirm();
            await newTab.locator('.ant-modal-content').waitFor({ state: 'visible', timeout: 15000 });
            await newTab.waitForTimeout(1500);
            await commonTool.takeScreenshot(newTab, 'GOMO', '8-ProblemPage');
            await net.clickButtonClose();
            await newTab.locator('.ant-modal-content').waitFor({ state: 'hidden', timeout: 5000 });
            await commonTool.takeScreenshot(newTab, 'GOMO', '9-ProblemPage');
        })
    })
})