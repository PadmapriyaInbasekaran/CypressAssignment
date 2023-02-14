class CheckoutPage {
    getPageTitle() {
        return cy.contains("Checkout: Your Information")
    }
    getFirstNameTextBox() {
        return cy.get("#first-name")
    }
    getLastNameTextBox() {
        return cy.get("#last-name")
    }
    getPostalCodeTextBox() {
        return cy.get("#postal-code")
    }
    getContinueButton() {
        return cy.contains("Continue")
    }
}
export default CheckoutPage