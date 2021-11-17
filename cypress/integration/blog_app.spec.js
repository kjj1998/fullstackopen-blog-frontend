/* eslint-disable linebreak-style */
describe('Blog app', function() {
  /* Clear the data in the testing database and add in a new user for testing*/
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'test',
      name: 'Test User',
      password: 'testpassword'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
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

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('test')
      cy.get('#password').type('testpassword')
      cy.get('#login-button').click()

      cy.contains('Test User logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('test')
      cy.get('#password').type('wrongpassword')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })

  describe('When logged in', function() {
    /* logs in user */
    beforeEach(function() {
      cy.get('#username').type('test')
      cy.get('#password').type('testpassword')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('Test')
      cy.get('#author').type('Test Author')
      cy.get('#url').type('Test.com')

      cy.get('#create').click()
      cy.contains('view').click()

      cy.get('.blog')
        .should('contain', 'Test')
        .and('contain', 'Test Author')
        .and('contain', 'Test.com')
        .and('contain', 'likes 0')
    })

    describe.only('When a blog is created', function() {
      beforeEach(function() {
        cy.contains('create new blog').click()
        cy.get('#title').type('Test')
        cy.get('#author').type('Test Author')
        cy.get('#url').type('Test.com')
        cy.get('#create').click()
      })

      it('A blog can be liked', function() {
        cy.contains('view').click()
        cy.contains('like').click()

        cy.get('.blog')
          .should('contain', 'Test')
          .and('contain', 'Test Author')
          .and('contain', 'Test.com')
          .and('contain', 'likes 1')
      })

      it('A blog can be deleted', function() {
        cy.contains('view').click()
        cy.contains('remove').click()

        cy.get('.notify')
          .should('contain', 'Test by Test Author removed!')
          .and('have.css', 'color', 'rgb(0, 128, 0)')
          .and('have.css', 'border-style', 'solid')
      })

      it('A blog not created by the currently logged in user cannot be removed', function() {
        const user2 = {
          username: 'test2',
          name: 'Test User2',
          password: 'testpassword2'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user2)

        cy.contains('logout').click()
        cy.contains('login').click()
        cy.get('#username').type('test2')
        cy.get('#password').type('testpassword2')
        cy.get('#login-button').click()

        cy.contains('view').click()
        cy.should('not.contain', 'remove')
      })
    })
  })
})