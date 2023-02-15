import LoginPage from "../PageFiles/LoginPage"
import ProductPage from "../PageFiles/ProductPage"
import CartPage from "../PageFiles/CartPage"
import CheckoutPage from "../PageFiles/CheckoutPage"

describe('My SwagLab Test', function () {
    beforeEach(function () {
        cy.fixture('login').then(function (loginData) {
            this.loginData = loginData
        })
        cy.fixture('product').then(function (productData) {
            this.productData = productData
        })
        cy.fixture('cart').then(function (cartData) {
            this.cartData = cartData
        })
        cy.fixture('checkout').then(function (checkData) {
            this.checkData = checkData
        })
    })

    const loginPage = new LoginPage()
    const productPage = new ProductPage()
    const cartPage = new CartPage()
    const checkoutPage = new CheckoutPage()

    before(function () {
        cy.LaunchApplication()
    })

    it('Verify items added to cart successfully!', function () {

        loginPage.getUserNameTextBox().type(this.loginData.username)
        loginPage.getPasswordTextBox().type(this.loginData.password)
        loginPage.getLoginButton().click()
        productPage.getPageTitle().should("have.text", this.productData.productPageText)
        productPage.getProducts().each(($el, index, $list) => {
            while (index < 2) {
                cy.contains("Add to cart").click()
                index++
            }
        })
        productPage.getAddToCartButton().click()
        cartPage.getPageTitle().should("have.text", this.cartData.cartPageText)
        cartPage.getListOfProductsAdded().should("have.text", this.cartData.listOfProductsAdded)
        cartPage.getCheckoutButton().click()
        checkoutPage.getPageTitle().should("have.text", this.checkData.checkoutPageText)
    })

    after(function () {
        productPage.getOpenMenu().click()
        productPage.getLogoutOption().click()
        loginPage.getLoginButton().should("have.value", "Login")
    })
})