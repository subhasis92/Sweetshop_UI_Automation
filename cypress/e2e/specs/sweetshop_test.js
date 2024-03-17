import WelcomePage from "../page/welcomePage";
import BasketPage from "../page/basketPage";

const welcomePage = new WelcomePage();
const basketPage = new BasketPage();

beforeEach(function () {
  cy.launchURL();
  welcomePage.addProductToBasket();
  welcomePage.clickBasket();
});

describe("Verify Sweetshop UI Automation suite", () => {
  it("verify All the selected items are present in basket", () => {
    basketPage.verifySelectedItemsInBasket();
  });
  it("verify total price in GBP is correct", () => {
    basketPage.verifyTotalValue();
  });
  it("verify the total priceby changing delivery type to Standard Shipping", () => {
    basketPage.selectStandardDeliveryMethod();
    basketPage.verifyTotalPriceWithStandardShipping();
  });
  it("Verify User able to Checkout", () => {
    basketPage.fillBillingDetails();
    basketPage.fillPaymentDetails();
    basketPage.clickOnCheckoutcta();
  });
});
