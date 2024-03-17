class WelcomePage {
  addProductToBasket() {
    cy.fixture("productQty.json").then((data) => {
      for (let key in data) {
        for (let i = 0; i < data[key]; i++) {
          cy.contains("h4", key)
            .parents(".card")
            .contains("a", "Add to Basket")
            .click();
        }
      }
    });
  }

  clickBasket() {
    cy.get("a[href='/basket']").click();
  }
}

export default WelcomePage;
