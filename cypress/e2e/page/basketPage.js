const {faker} = require("@faker-js/faker");

class BasketPage {
  verifySelectedItemsInBasket() {
    cy.fixture("productQty.json").then((data) => {
      for (let key in data) {
        cy.get("#basketItems")
          .contains(key)
          .siblings("small")
          .should("have.text", "x " + data[key]);
      }
    });
  }

  fillBillingDetails() {
    cy.get("input#name").eq(0).type(faker.person.firstName());
    cy.get("input#name").eq(1).type(faker.person.lastName());
    cy.get("input#email").type(faker.internet.email());
    cy.get("input#address").type(faker.location.streetAddress());
    cy.get("#country").select(1);
    cy.get("#city").select(1);
    cy.get("#zip").type(faker.location.zipCode());
  }
  fillPaymentDetails() {
    cy.get("input#cc-name").type(faker.person.fullName());
    cy.get("input#cc-number").type(faker.number.int({min:232345670980, max:232499999999}));
    cy.get("input#cc-expiration").type(faker.number.int({min:1, max:12})+'/'+faker.number.int({min:2025, max:2028}));
    cy.get("input#cc-cvv").type(faker.number.int({min:100, max:999}));
  }

  clickOnCheckoutcta() {
    cy.contains("button", "Continue to checkout").click();
  }

  selectStandardDeliveryMethod() {
    cy.get('label[for="exampleRadios2"]').click();
  }

  verifyTotalPriceWithStandardShipping() {
    this.calculateTotalValue();
    cy.get('label[for="exampleRadios2"]').then(($el) => {
      let lblStdShippingCharge = $el.text();
      let regex = /\d+(\.\d+)?/g;
      let stdShippingCharge = lblStdShippingCharge
        .match(regex)
        .map((shipingCharge) => {
          return parseFloat(shipingCharge);
        });
      cy.get("li span")
        .contains("Total (GBP)")
        .siblings("strong")
        .each(($el) => {
          let lblTotalPrice = parseFloat($el.text().replace(/£/g, ""));
          cy.get("@calculatedPrice").then((TotalCalprice) => {
            let updatedTotalprice =
              parseFloat(TotalCalprice) + parseFloat(stdShippingCharge);
            expect(updatedTotalprice).to.equal(lblTotalPrice);
          });
        });
    });
  }

  verifyTotalValue() {
    this.calculateTotalValue();
    cy.get("li span")
      .contains("Total (GBP)")
      .siblings("strong")
      .each(($el) => {
        let lblTotalPrice = parseFloat($el.text().replace(/£/g, ""));
        cy.get("@calculatedPrice").then((TotalCalprice) => {
          expect(TotalCalprice).to.equal(lblTotalPrice);
        });
      });
  }

  calculateTotalValue() {
    let itemsTotalPriceList = [];
    cy.get("ul#basketItems li.lh-condensed")
      .each(($el) => {
        cy.wrap($el)
          .find("small.text-muted")
          .then(($itemQty) => {
            let itemQty = parseFloat($itemQty.text().replace(/x/g, ""));
            cy.wrap($el)
              .find("span.text-muted")
              .then(($itemPrice) => {
                let itemPrice = parseFloat($itemPrice.text().replace(/£/g, ""));
                itemsTotalPriceList.push(itemPrice * itemQty);
              });
          });
      })
      .then(() => {
        const calulatedTotalValue = itemsTotalPriceList.reduce(
          (price, total) => {
            return price + total;
          },
        );
        cy.wrap(calulatedTotalValue).as("calculatedPrice");
      });
  }
}
export default BasketPage;
