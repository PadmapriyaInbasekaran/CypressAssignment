class CartPage {
    getPageTitle() {
        return cy.contains("Your Cart")
    }
    getCheckoutButton() {
        return cy.contains("Checkout")
    }
    getListOfProductsAdded() {
        return cy.get(".shopping_cart_badge")
    }

}
export default CartPage