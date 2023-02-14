import LoginPage from "../PageFiles/LoginPage"
import ProductPage from "../PageFiles/ProductPage"
import CartPage from "../PageFiles/CartPage"
import CheckoutPage from "../PageFiles/CheckoutPage"
import CheckoutOverviewPage from "../PageFiles/CheckoutOverviewPage"

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


    before(function () {
        cy.visitSauceDemo()
    })

    it('Verify checkout details are correct!', function () {

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

    })

    after(function () {
        productPage.getOpenMenu().click()
        productPage.getLogoutOption().click()
        loginPage.getLoginButton().should("have.value", "Login")
    })
})
