import LoginPage from "../PageFiles/LoginPage"
import ProductPage from "../PageFiles/ProductPage"

describe('My SwagLab Test Suite', function () {
  beforeEach(function () {
    cy.fixture('login').then(function (loginData) {
      this.loginData = loginData
    })
    cy.fixture('product').then(function (productData) {
      this.productData = productData
    })
  })

  const loginPage = new LoginPage()
  const productPage = new ProductPage()

  before(function () {
    cy.LaunchApplication()
  })

  it('Verify Saucedemo.com login is successful!', function () {

    loginPage.login(this.loginData.username, this.loginData.password)
    productPage.getPageTitle().should("have.text", this.productData.productPageText)
  })

  after(function () {
    cy.LogoutFromApplication()
    loginPage.getLoginButton().should("have.value", "Login")
  })
})
