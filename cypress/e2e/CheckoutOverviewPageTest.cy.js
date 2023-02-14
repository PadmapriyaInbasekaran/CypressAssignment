import LoginPage from "../PageFiles/LoginPage"
import ProductPage from "../PageFiles/ProductPage"
import CartPage from "../PageFiles/CartPage"
import CheckoutPage from "../PageFiles/CheckoutPage"
import CheckoutOverviewPage from "../PageFiles/CheckoutOverviewPage"
import CheckoutCompletePage from "../PageFiles/CheckoutCompletePage"

describe('My SwagLab Test', function () {
    beforeEach(function () {
        cy.fixture('saucedemo').then(function (data) {
            this.data = data
        })
    })

    const loginPage = new LoginPage()
    const productPage = new ProductPage()
    const cartPage = new CartPage()
    const checkoutPage = new CheckoutPage()
    const checkoutOverviewPage = new CheckoutOverviewPage()
    const checkoutCompletePage = new CheckoutCompletePage()

    before(function () {
        cy.visitSauceDemo()
    })

    it('Verify quantity, price of the each item and total price in the cart!', function () {

        //LoginPage
        loginPage.getUserNameTextBox().type(this.data.username)
        loginPage.getPasswordTextBox().type(this.data.password)
        loginPage.getLoginButton().click()
        productPage.getPageTitle().should("have.text", "Products")

        //ProductPage
        productPage.getProducts().each(($el, index, $list) => {
            while (index < 2) {
                cy.contains("Add to cart").click()
                index++
            }
        })
        productPage.getAddToCartButton().click()
        cartPage.getPageTitle().should("have.text", "Your Cart")

        //CartPage
        cartPage.getListOfProductsAdded().should("have.text", '2')
        cartPage.getCheckoutButton().click()
        checkoutPage.getPageTitle().should("have.text", "Checkout: Your Information")

        //CheckoutPage
        checkoutPage.getFirstNameTextBox().type(this.data.firstname)
        checkoutPage.getLastNameTextBox().type(this.data.lastname)
        checkoutPage.getPostalCodeTextBox().type(this.data.postalcode)
        checkoutPage.getContinueButton().click()
        checkoutOverviewPage.getPageTitle().should("have.text", "Checkout: Overview")

        //CheckoutOverviewPage

        checkoutOverviewPage.getCartItemQuantity().should("have.text", "11")
        checkoutOverviewPage.getCartItemPrice().should("have.text", "$29.99$9.99")
        checkoutOverviewPage.getCartTotal().should("have.text", "Total: $43.18")
        checkoutOverviewPage.getFinishButton().click()
        checkoutCompletePage.getPageTitle().should("have.text", "Checkout: Complete!")

    })

    after(function () {
        productPage.getOpenMenu().click()
        productPage.getLogoutOption().click()
        loginPage.getLoginButton().should("have.value", "Login")
    })
})
