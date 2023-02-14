import LoginPage from "../PageFiles/LoginPage"
import ProductPage from "../PageFiles/ProductPage"

describe('My SwagLab Test', function () {
  beforeEach(function () {
    cy.fixture('saucedemo').then(function (data) {
      this.data = data
    })
  })

  const loginPage = new LoginPage()
  const productPage = new ProductPage()

  before(function () {
    cy.visitSauceDemo()
  })

  it('Verify Saucedemo.com login is successful!', function () {

    //LoginPage
    loginPage.getUserNameTextBox().type(this.data.username)
    loginPage.getPasswordTextBox().type(this.data.password)
    loginPage.getLoginButton().click()
    productPage.getPageTitle().should("have.text", "Products")


  })

  after(function () {
    productPage.getOpenMenu().click()
    productPage.getLogoutOption().click()
    loginPage.getLoginButton().should("have.value", "Login")
  })
})
