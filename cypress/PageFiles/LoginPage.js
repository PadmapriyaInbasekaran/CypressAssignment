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
}
export default LoginPage