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
        cy.fixture('checkoutOverview').then(function (checkoutOverviewData) {
            this.checkoutOverviewData = checkoutOverviewData
        })
        cy.fixture('checkoutcomplete').then(function (checkoutCompleteData) {
            this.checkoutCompleteData = checkoutCompleteData
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

    it('Verify quantity, price of the each item and total price in the cart!', function () {

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
        checkoutOverviewPage.getCartItemQuantity().each(($el, index, $list) => {
            if (index == 0) {
                const quantityOfFirstItem = $el.text()
                expect(quantityOfFirstItem).to.be.equal(this.checkoutOverviewData.cartItemQuantity1)
            }
            if (index == 1) {
                const quantityOfSecondItem = $el.text()
                expect(quantityOfSecondItem).to.be.equal(this.checkoutOverviewData.cartItemQuantity2)
            }
        })
        var x
        var y
        var priceOfFirstItem
        var priceOfSecondItem
        var sum
        checkoutOverviewPage.getCartItemPrice().each(($el, index, $list) => {
            if (index == 0) {
                priceOfFirstItem = $el.text()
                expect(priceOfFirstItem).to.be.equal(this.checkoutOverviewData.cartItemPrice1)
                x = priceOfFirstItem.split("$")
                x = x[1]
            }
            if (index == 1) {
                priceOfSecondItem = $el.text()
                expect(priceOfSecondItem).to.be.equal(this.checkoutOverviewData.cartItemPrice2)
                y = priceOfSecondItem.split("$")
                y = y[1]
                sum = Number(x) + Number(y) + Number(3.20)
                const finalValue = "Total: $" + sum
                expect(finalValue).to.be.equal(this.checkoutOverviewData.cartTotal)
            }

        })


        checkoutOverviewPage.getFinishButton().click()
        checkoutCompletePage.getPageTitle().should("have.text", this.checkoutCompleteData.checkoutCompletePageText)

    })

    after(function () {
        cy.LogoutFromApplication()
        loginPage.getLoginButton().should("have.value", "Login")
    })
})
