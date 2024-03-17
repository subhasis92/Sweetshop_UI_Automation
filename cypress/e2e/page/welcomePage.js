class WelcomePage {
  verifyWelcomePage(){
    cy.contains('h1','Welcome to the sweet shop!').should('be.visible');
  };

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

  clickBasketIcon() {
    cy.get("a[href='/basket']").click();
  }
}

export default WelcomePage;
