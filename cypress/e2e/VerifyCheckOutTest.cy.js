import LoginPage from "../PageFiles/LoginPage"
import ProductPage from "../PageFiles/ProductPage"
import CartPage from "../PageFiles/CartPage"
import CheckoutPage from "../PageFiles/CheckoutPage"
import CheckoutOverviewPage from "../PageFiles/CheckoutOverviewPage"

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
        cy.fixture('checkout').then(function (checkoutData) {
            this.checkoutData = checkoutData
        })
        cy.fixture('checkoutOverview').then(function (checkoutOverviewData) {
            this.checkoutOverviewData = checkoutOverviewData
        })
    })

    const loginPage = new LoginPage()
    const productPage = new ProductPage()
    const cartPage = new CartPage()
    const checkoutPage = new CheckoutPage()
    const checkoutOverviewPage = new CheckoutOverviewPage()


    before(function () {
        cy.LaunchApplication()
    })

    it('Verify checkout details are correct!', function () {
        loginPage.login(this.loginData.username, this.loginData.password)
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
        checkoutPage.getPageTitle().should("have.text", this.checkoutData.checkoutPageText)
        checkoutPage.getFirstNameTextBox().type(this.checkoutData.firstname)
        checkoutPage.getLastNameTextBox().type(this.checkoutData.lastname)
        checkoutPage.getPostalCodeTextBox().type(this.checkoutData.postalcode)
        checkoutPage.getContinueButton().click()
        checkoutOverviewPage.getPageTitle().should("have.text", this.checkoutOverviewData.checkoutOverviewPageText)

    })

    after(function () {
        cy.LogoutFromApplication()
        loginPage.getLoginButton().should("have.value", "Login")
    })
})
