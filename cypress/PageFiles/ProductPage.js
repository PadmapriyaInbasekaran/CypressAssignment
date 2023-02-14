class ProductPage {
    getPageTitle() {
        return cy.contains("Products")
    }
    getProducts() {
        return cy.get(".inventory_list")
    }
    getAddToCartButton() {
        return cy.get(".shopping_cart_link")
    }
    getOpenMenu() {
        return cy.get("#react-burger-menu-btn")
    }
    getLogoutOption() {
        return cy.get("#logout_sidebar_link")
    }
}
export default ProductPage