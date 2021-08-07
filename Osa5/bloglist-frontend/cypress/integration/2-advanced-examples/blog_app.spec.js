/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('salainen')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('soffeli')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()

      cy.contains('wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('Liemessä')
      cy.get('#author').type('Hans Välimäki')
      cy.get('#url').type('https://liemessa.fi/')
      cy.get('#create-button').click()
      cy.contains('A new blog Liemessä by Hans Välimäki added')
    })

    it('A blog can be liked', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('Liemessä')
      cy.get('#author').type('Hans Välimäki')
      cy.get('#url').type('https://liemessa.fi/')
      cy.get('#create-button').click()

      cy.get('#view-button').click()
      cy.contains('0 likes')
      cy.get('#like-button').click()
      cy.contains('1 likes')
    })

    it('A blog can be deleted', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('Liemessä')
      cy.get('#author').type('Hans Välimäki')
      cy.get('#url').type('https://liemessa.fi/')
      cy.get('#create-button').click()

      cy.get('#view-button').click()
      cy.get('#remove-button').click()

      cy.get('html').should('not.contain', 'Liemessä Hans Välimäki')
    })
    describe('multiple blogs exists', function () {
      beforeEach(function () {
        cy.login({ username: 'mluukkai', password: 'salainen' })
        cy.createBlog({ author: 'Cypress', title: 'Blog1', url: 'http://test.com./blog1' })
        cy.createBlog({ author: 'Cypress', title: 'Blog2', url: 'http://test.com./blog2' })
        cy.createBlog({ author: 'Cypress', title: 'Blog3', url: 'http://test.com./blog3' })

        cy.contains('Blog1').parent().as('blog1')
        cy.contains('Blog2').parent().as('blog2')
        cy.contains('Blog3').parent().as('blog3')


      })
      it('Blogs are ordered based on number of likes, in descending order', function () {
        cy.get('@blog1').contains('view').click()
        cy.get('@blog2').contains('view').click()
        cy.get('@blog3').contains('view').click()
        cy.get('@blog1').contains('like').as('like1')
        cy.get('@blog2').contains('like').as('like2')
        cy.get('@blog3').contains('like').as('like3')

        cy.get('@like2').click()
        cy.wait(500)
        cy.get('@like1').click()
        cy.wait(500)
        cy.get('@like1').click()
        cy.wait(500)
        cy.get('@like3').click()
        cy.wait(500)
        cy.get('@like3').click()
        cy.wait(500)
        cy.get('@like3').click()
        cy.wait(1000)

        cy.get('.blog').then(blogs => {
          cy.wrap(blogs[0]).contains('3')
          cy.wrap(blogs[1]).contains('2')
          cy.wrap(blogs[2]).contains('1')
        })
      })
    })
  })
})
