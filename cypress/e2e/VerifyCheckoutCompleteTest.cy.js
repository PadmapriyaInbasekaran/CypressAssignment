import LoginPage from "../PageFiles/LoginPage"
import ProductPage from "../PageFiles/ProductPage"
import CartPage from "../PageFiles/CartPage"
import CheckoutPage from "../PageFiles/CheckoutPage"
import CheckoutOverviewPage from "../PageFiles/CheckoutOverviewPage"
import CheckoutCompletePage from "../PageFiles/CheckoutCompletePage"

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
        cy.fixture('checkoutcomplete').then(function (checkoutCompleteData) {
            this.checkoutCompleteData = checkoutCompleteData
          })
        cy.fixture('checkoutoverview').then(function (checkoutOverviewData) {
            this.checkoutOverviewData = checkoutOverviewData
          })
    })

    const loginPage = new LoginPage()
    const productPage = new ProductPage()
    const cartPage = new CartPage()
    const checkoutPage = new CheckoutPage()
    const checkoutOverviewPage = new CheckoutOverviewPage()
    const checkoutCompletePage = new CheckoutCompletePage()

    before(function () {
        cy.LaunchApplication()
    })

    it('Verify Checkout is done Successfully!', function () {

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
        cartPage.getListOfProductsAdded().should("have.text",  this.cartData.listOfProductsAdded)
        cartPage.getCheckoutButton().click()
        checkoutPage.getPageTitle().should("have.text", this.checkoutData.checkoutPageText)
        checkoutPage.getFirstNameTextBox().type(this.checkoutData.firstname)
        checkoutPage.getLastNameTextBox().type(this.checkoutData.lastname)
        checkoutPage.getPostalCodeTextBox().type(this.checkoutData.postalcode)
        checkoutPage.getContinueButton().click()
        checkoutOverviewPage.getPageTitle().should("have.text", this.checkoutOverviewData.checkoutOverviewPageText)
        checkoutOverviewPage.getCartItemQuantity().should("have.text", this.checkoutOverviewData.cartItemQuantity)
        checkoutOverviewPage.getCartItemPrice().should("have.text", this.checkoutOverviewData.cartItemPrice)
        checkoutOverviewPage.getCartTotal().should("have.text", this.checkoutOverviewData.cartTotal)
        checkoutOverviewPage.getFinishButton().click()
        checkoutCompletePage.getPageTitle().should("have.text", this.checkoutCompleteData.checkoutCompletePageText)
        checkoutCompletePage.getThankyouTextMessage().should("have.text", this.checkoutCompleteData.thankyouMessage)
        checkoutCompletePage.getBackToHomeButton().click()

    })

    after(function () {
        productPage.getOpenMenu().click()
        productPage.getLogoutOption().click()
        loginPage.getLoginButton().should("have.value", "Login")
    })
})
