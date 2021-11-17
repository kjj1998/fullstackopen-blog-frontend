/* eslint-disable linebreak-style */
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
    cy.contains('login').click()
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
    cy.contains('cancel')
  })
})