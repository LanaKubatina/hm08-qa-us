const page = require('../../page');
const helper = require('../../helper')

describe('Create an order', () => {

    it('should set up the addresses', async ()=> {
        await browser.url('/')
        const fromField = await $(page.fromField);
        await fromField.setValue('East 2nd Street, 601');
        const toField = await $(page.toField);
        await toField.setValue('1300 1st St');
        await browser.pause(1000);
        const adressFrom = await fromField.getValue();
        await expect(adressFrom).toBe('East 2nd Street, 601');
        const adressTo = await toField.getValue();
        await expect(adressTo).toBe('1300 1st St'); 
    })

    it("should select supportive plan", async () => {
        await browser.url("/")
        await page.fillAddresses("East 2nd Street, 601", "1300 1st St");
        const supportiveButton = await $(page.supportiveButton);
        await supportiveButton.click();
        const parentOfSupportiveButton = supportiveButton.parentElement();
        await expect(parentOfSupportiveButton).toHaveElementClass('active');
    })

    it('should fill in the phone number', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.fillPhoneNumber(phoneNumber);
        const phoneNumberExists = await $(page.phoneNumberField).isExisting();
        await expect(phoneNumberExists).toBe(true);
    })
    
    it("should add a credit card", async () => {
        await browser.url("/");
        await page.fillAddresses("East 2nd Street, 601", "1300 1st St");
        const paymentMethodButton = await $(page.paymentMethodButton);
        await paymentMethodButton.click();
        const paymentMethodModal = await $(page.paymentMethodModal);
        await paymentMethodModal.waitForDisplayed();

        const addCardButton = await $(page.addCardButton);
        await addCardButton.click();
        const addingCardModal = await $(page.addingCardModal);
        await addingCardModal.waitForDisplayed();
        
        const cardNumber = await $(page.cardNumber);
        await cardNumber.setValue('123456780000');
        const cvvField = await $(page.cvvField);
        await cvvField.setValue('34');
        const freeField = await $(page.freeField)
        await freeField.click();

        const linkButton = await $(page.linkButton);
        await linkButton.waitForClickable();
        await linkButton.click();
        await paymentMethodModal.waitForDisplayed();
        const checkMark = await $(page.checkMark);
        await expect(checkMark).toBeExisting();
    })

    it('should write a message for the driver', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const messageField = await $(page.messageField);
        await messageField.setValue('Hurry up!');
        const message = await messageField.getValue();
        await expect(message).toBe('Hurry up!'); 
    })

    it('should order a blanket and handkerchiefs', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.chooseSupportivePlan();
        const switchButton = await $(page.switchButton);
        await switchButton.click();
        await expect(switchButton).toBeEnabled();
    })

    it('should order 2 Ice creams', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.chooseSupportivePlan();
        const plusButton = await $(page.plusButton);
        await plusButton.click();
        await plusButton.click();
        const counterValue0 = await $(page.counterValue0);
        const counterValue2 = await counterValue0.getText();
        await expect(counterValue2).toBe("2");

    })

    it('should check if the car search modal appears', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.chooseSupportivePlan();
        const orderButton = await $(page.orderButton);
        await orderButton.click();
        const carSearchModal = await $(page.carSearchModal);
        await expect(carSearchModal).toBeExisting();
    })

    it('should wait for the driver info to appear', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const businessButton = await $(page.businessButton);
        await businessButton.click();
        await page.order();
        const carSearchModal = await $(page.carSearchModal);
        await carSearchModal.waitForDisplayed();
        const orderContent = await $(page.orderContent);
        await orderContent.waitForDisplayed();
        await browser.pause(30000);
        await expect(orderContent).toBeExisting();

    })
})

