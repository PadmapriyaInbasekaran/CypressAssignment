import LoginPage from "../PageFiles/LoginPage"
import ProductPage from "../PageFiles/ProductPage"

describe('My SwagLab Test', function () {
  beforeEach(function () {
    cy.fixture('login').then(function (loginData) {
      this.loginData = loginData
    })
  })

  const loginPage = new LoginPage()
  const productPage = new ProductPage()

  before(function () {
    cy.LaunchApplication()
  })

  it('Verify Saucedemo.com login is successful!', function () {

    loginPage.getUserNameTextBox().type(this.loginData.username)
    loginPage.getPasswordTextBox().type(this.loginData.password)
    loginPage.getLoginButton().click()
    productPage.getPageTitle().should("have.text", "Products")


  })

  after(function () {
    productPage.getOpenMenu().click()
    productPage.getLogoutOption().click()
    loginPage.getLoginButton().should("have.value", "Login")
  })
})
