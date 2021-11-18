/* eslint-disable linebreak-style */
describe('Blog app', function() {
  /* Clear the data in the testing database and add in a new user for testing*/
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users/', {
      username: 'test1',
      name: 'Test User 1',
      password: 'testpassword1'
    })
    cy.request('POST', 'http://localhost:3003/api/users/', {
      username: 'test2',
      name: 'Test User 2',
      password: 'testpassword2'
    })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('login to application')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('test1')
      cy.get('#password').type('testpassword1')
      cy.get('#login').click()

      cy.contains('Test User 1 logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('test')
      cy.get('#password').type('wrongpassword')
      cy.get('#login').click()

      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })

  describe('When logged in', function() {
    /* logs in user */
    beforeEach(function() {

      /*
      cy.get('#username').type('test')
      cy.get('#password').type('testpassword')
      cy.get('#login-button').click()
			*/

      cy.login({ username: 'test1', password: 'testpassword1' })
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('Readable Cypress.io tests')
      cy.get('#author').type('Gleb Bahmutov')
      cy.get('#url').type('https://glebbahmutov.com/blog/readable-tests/')
      cy.get('#create').click()

      cy.contains('view').click()

      cy.get('.blog')
        .should('contain', 'Readable Cypress.io tests')
        .and('contain', 'Gleb Bahmutov')
        .and('contain', 'https://glebbahmutov.com/blog/readable-tests/')
        .and('contain', 'likes 0')
    })

    describe('When several blogs created by many people exist', function() {
      beforeEach(function() {
        cy.login({ username: 'test1', password: 'testpassword1' })
        cy.createBlog({ author: 'John Doe', title: 'test1', url: 'http://example.com./test1' })
        cy.createBlog({ author: 'John Doe', title: 'test2', url: 'http://example.com./test2' })
        cy.contains('logout').click()
        cy.login({ username: 'test2', password: 'testpassword2' })
        cy.createBlog({ author: 'Jane Doe', title: 'test3', url: 'http://example.com./test3' })

        cy.contains('test1').parent().parent().as('blog1')
        cy.contains('test2').parent().parent().as('blog2')
        cy.contains('test3').parent().parent().as('blog3')
      })

      it('Blogs can be liked', function() {
        cy.get('@blog2').contains('view').click()
        cy.get('@blog2').contains('like').click()
        cy.get('@blog2').contains('likes 1')
      })

      it('they are ordered by number of likes', function() {
        cy.get('@blog1').contains('view').click()
        cy.get('@blog2').contains('view').click()
        cy.get('@blog3').contains('view').click()
        cy.get('@blog1').contains('like').as('like1')
        cy.get('@blog2').contains('like').as('like2')
        cy.get('@blog3').contains('like').as('like3')

        cy.get('@like2').click()
        cy.get('@like1').click()
        cy.get('@like1').click()
        cy.get('@like3').click()
        cy.get('@like3').click()
        cy.get('@like3').click()

        cy.get('.blog').then(blogs => {
          cy.wrap(blogs[0]).contains('likes 3')
          cy.wrap(blogs[1]).contains('likes 2')
          cy.wrap(blogs[2]).contains('likes 1')
        })
      })

      it('The creator can delete a blog', function() {
        cy.get('@blog3').contains('view').click()
        cy.get('@blog3').contains('remove').click()
        // cy.visit('http://localhost:3000')
        cy.should('not.contain', 'test3')

        cy.get('@blog2').contains('view').click()
        cy.get('@blog2').should('not.contain', 'remove')
      })
    })
  })
})