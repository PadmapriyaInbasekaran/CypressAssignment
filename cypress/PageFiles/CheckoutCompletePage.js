class CheckoutCompletePage {

    getPageTitle() {
        return cy.contains("Checkout: Complete!")
    }

    getThankyouTextMessage() {
        return cy.contains("THANK YOU FOR YOUR ORDER")
    }

    getBackToHomeButton() {
        return cy.contains("Back Home")
    }
}
export default CheckoutCompletePage