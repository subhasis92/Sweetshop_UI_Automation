import WelcomePage from "../page/welcomePage";
import BasketPage from "../page/basketPage";

const welcomePage = new WelcomePage();
const basketPage = new BasketPage();

beforeEach(function () {
  cy.launchURL();
});

describe("Verify Sweetshop UI Automation suite", () => {
  it("verify All the selected items are present in basket", () => {
    welcomePage.verifyWelcomePage();
    welcomePage.addProductToBasket();
    welcomePage.clickBasketIcon();
    basketPage.verifyBasketPage();
    basketPage.verifySelectedItemsInBasket();
  });
  it("verify total price in GBP is correct", () => {
    welcomePage.verifyWelcomePage();
    welcomePage.addProductToBasket();
    welcomePage.clickBasketIcon();
    basketPage.verifyBasketPage();
    basketPage.verifyTotalValue();
  });
  it("verify the total priceby changing delivery type to Standard Shipping", () => {
    welcomePage.verifyWelcomePage();
    welcomePage.addProductToBasket();
    welcomePage.clickBasketIcon();
    basketPage.verifyBasketPage();
    basketPage.selectStandardDeliveryMethod();
    basketPage.verifyTotalPriceWithStandardShipping();
  });
  it("Verify User able to Checkout", () => {
    welcomePage.verifyWelcomePage();
    welcomePage.addProductToBasket();
    welcomePage.clickBasketIcon();
    basketPage.verifyBasketPage();
    basketPage.fillBillingDetails();
    basketPage.fillPaymentDetails();
    basketPage.clickOnCheckoutcta();
    basketPage.verifyCheckoutSuccessful();
  });
});
