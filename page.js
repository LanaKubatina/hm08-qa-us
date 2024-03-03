module.exports = {
    // Inputs
    fromField: '#from',
    toField: '#to',
    phoneNumberField: '#phone',
    codeField: '#code',
    cardNumber: '#number',
    cvvField: '//div[@class="card-code-input"]//input[@id="code"]',
    messageField : '#comment',

    // Buttons
    callATaxiButton: 'button=Call a taxi',
    phoneNumberButton: '//div[starts-with(text(), "Phone number")]',
    nextButton: 'button=Next',
    confirmButton: 'button=Confirm',
    supportiveButton: 'div=Supportive',
    paymentMethodButton: '.pp-button.filled',
    addCardButton: '.pp-row.disabled',
    linkButton: 'div[class="pp-buttons"] button[type="submit"]',
    switchButton: '(//span[@class="slider round"])[1]',
    plusButton: '//div[@class="r-group"]//div[1]//div[1]//div[2]//div[1]//div[3]',
    orderButton: '//button[@class="smart-button"]',

    //Marks
    checkMark : '.checkmark',
    freeField : '//div[@class="plc"]',
    counterValue0: '//div[normalize-space()="2"]',
    counterValue2: './/div[class=‘r-counter’]/div/div[@class=‘counter-value’ text()=‘2’]',
    orderContent: '//div[@class="order-header-content"]',
    
    // Modals
    phoneNumberModal: '.modal',
    paymentMethodModal: '(//div[@class="section active"])[2]',
    addingCardModal: '//div[@class="section active unusual"]',
    carSearchModal: '//div[@class="order-subbody"]',

    // Functions
    fillAddresses: async function(from, to) {
        const fromField = await $(this.fromField);
        await fromField.setValue(from);
        const toField = await $(this.toField);
        await toField.setValue(to);
        const callATaxiButton = await $(this.callATaxiButton);
        await callATaxiButton.waitForDisplayed();
        await callATaxiButton.click();
    },
    fillPhoneNumber: async function(phoneNumber) {
        const phoneNumberButton = await $(this.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(this.phoneNumberModal);
        await phoneNumberModal.waitForDisplayed()
        const phoneNumberField = await $(this.phoneNumberField);
        await phoneNumberField.waitForDisplayed();
        await phoneNumberField.setValue(phoneNumber);
    },
    submitPhoneNumber: async function(phoneNumber) {
        await this.fillPhoneNumber(phoneNumber);
        // we are starting interception of request from the moment of method call
        await browser.setupInterceptor();
        await $(this.nextButton).click();
        // we should wait for response
        // eslint-disable-next-line wdio/no-pause
        await browser.pause(2000);
        const codeField = await $(this.codeField);
        // collect all responses
        const requests = await browser.getRequests();
        // use first response
        await expect(requests.length).toBe(1)
        const code = await requests[0].response.body.code
        await codeField.setValue(code)
        await $(this.confirmButton).click()
    },
    chooseSupportivePlan: async function() {
        const supportiveButton = await $(this.supportiveButton);
        await supportiveButton.waitForClickable();
        await supportiveButton.click();
        await browser.pause(2000);
    },
    order: async function() {
    const orderButton = await $(page.orderButton);
    await orderButton.waitForClickable();
    await orderButton.click();
    const carSearchModal = await $(page.carSearchModal);
    await carSearchModal.waitForDisplayed();
    },

}