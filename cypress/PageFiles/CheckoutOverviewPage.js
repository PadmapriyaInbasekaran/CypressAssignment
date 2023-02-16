class CheckoutOverviewPage {
    getPageTitle() {
        return cy.contains("Checkout: Overview")
    }
    getFinishButton() {
        return cy.contains("Finish")
    }
    getCartItemQuantity() {
        return cy.get(".cart_quantity")
    }
    getCartItemPrice() {
        return cy.get(".inventory_item_price")
    }
    getCartItems() {
        return cy.get(".cart_item")
    }
    getCartTotal() {
        return cy.get(".summary_total_label")
    }
    getCartTotal() {
        return cy.get(".summary_total_label")
    }
    getCartList() {
        return cy.get(".cart_list")
    }
}
export default CheckoutOverviewPage