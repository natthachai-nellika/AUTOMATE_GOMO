const { test, expect } = require('@playwright/test')
const fs = require('fs/promises')
const path = require('path')
const { CommonTool } = require('../Common/common-page')

const { GomoCustomerServicePage } = require('../Pages/gomo-customer-service')
const { CustomerServicePage } = require('../Pages/customer-service')
const { GomoPage } = require('../Pages/gomo-direct-page')

const testData = {
    firstname: 'Natthachai',
    lastname: 'Sirinai',
    zipcode: '10700',
    priceA: '$29.99',
    priceB: '$9.99',
    priceC: '$15.99',
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

test.describe('TC_129N.spec', async () => {
    logAndTimeStamp('TC_129N.spec')
    test.setTimeout(600000)
    test.slow()

    test('GOMO', async () => {
        const commonTool = new CommonTool('GOMO-TC129N')
        commonTool.setTitleflowVideo('GOMO')

        let { browser, page } = await commonTool.createPageWithFakeVideo(
            '../resources/temp-fake-video.y4m',
            'Swag Labs'
        )

        const gomoCustomerService = new GomoCustomerServicePage(page)
        const customerService = new CustomerServicePage(page)
        const gomo = new GomoPage (page)

        await test.step('Gomo Page', async () => {
            logAndTimeStamp('Login Page')
            await gomo.gotoGomoPage();
            await page.waitForTimeout(3000)
            await commonTool.takeScreenshot(page, 'GOMO', '1-GOMO Page')

  })

}
)
}
)