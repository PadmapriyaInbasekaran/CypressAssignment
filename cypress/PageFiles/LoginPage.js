class LoginPage {
    getUserNameTextBox() {
        return cy.get("#user-name")
    }
    getPasswordTextBox() {
        return cy.get("#password")
    }
    getLoginButton() {
        return cy.get("#login-button")
    }
    login(username, password)
    {
    this.getUserNameTextBox().type(username)
    this.getPasswordTextBox().type(password)
    this.getLoginButton().click()
    }
}
export default LoginPage