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
        checkoutOverviewPage.getCartItemPrice().each(($el, index, $list) => {
            if (index == 0) {
                const priceOfFirstItem = $el.text()
                expect(priceOfFirstItem).to.be.equal(this.checkoutOverviewData.cartItemPrice1)
            }
            if (index == 1) {
                const priceOfSecondItem = $el.text()
                expect(priceOfSecondItem).to.be.equal(this.checkoutOverviewData.cartItemPrice2)
            }
        })
        var priceOfFirstItemSplit
        var priceOfSecondItemSplit
        var priceOfFirstItem
        var priceOfSecondItem
        var sum
        const tax = 3.20
        checkoutOverviewPage.getCartItemPrice().each(($el, index, $list) => {
            if (index == 0) {
                priceOfFirstItem = $el.text()
                expect(priceOfFirstItem).to.be.equal(this.checkoutOverviewData.cartItemPrice1)
                priceOfFirstItemSplit = priceOfFirstItem.split("$")
                priceOfFirstItemSplit = priceOfFirstItemSplit[1]
            }
            if (index == 1) {
                priceOfSecondItem = $el.text()
                expect(priceOfSecondItem).to.be.equal(this.checkoutOverviewData.cartItemPrice2)
                priceOfSecondItemSplit = priceOfSecondItem.split("$")
                priceOfSecondItemSplit = priceOfSecondItemSplit[1]
                sum = Number(priceOfFirstItemSplit) + Number(priceOfSecondItemSplit) + Number(tax)
                const finalCartTotal = "Total: $" + sum
                expect(finalCartTotal).to.be.equal(this.checkoutOverviewData.cartTotal)
            }

        })

        checkoutOverviewPage.getFinishButton().click()
        checkoutCompletePage.getPageTitle().should("have.text", this.checkoutCompleteData.checkoutCompletePageText)
        checkoutCompletePage.getThankyouTextMessage().should("have.text", this.checkoutCompleteData.thankyouMessage)
        checkoutCompletePage.getBackToHomeButton().click()

    })

    after(function () {
        cy.LogoutFromApplication()
        loginPage.getLoginButton().should("have.value", "Login")
    })
})
