describe('Blog app', function() {

    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.login({username: 'root', password: 'root'})
        cy.visit('http://localhost:3000')
    })

    it('login form is shown by default', function() {
        cy.contains('Login').click()
    })

    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.contains('Login').click()
            cy.get('#username').type('root')
            cy.get('#password').type('root')
            cy.get('#login-button').click()
    
            cy.contains('superuser logged in')
        })
    
        it('fails with wrong credentials', function() {
            cy.contains('Login').click()
            cy.get('#username').type('williamlolle')
            cy.get('#password').type('williamlolle')
            cy.get('#login-button').click()
    
            cy.contains('WRONG CREDENTIALS')
        })
    })

    describe('When logged in', function() {
        beforeEach(function() {
            cy.contains('Login').click()
            cy.get('#username').type('root')
            cy.get('#password').type('root')
            cy.get('#login-button').click()
        })
    
        it('A blog can be created', function() {
          cy.contains('Add a new blog').click()
          cy.get('#title').type('A fresh start')
          cy.get('#author').type('Stefano Moscatelli')
          cy.get('#url').type('http://localhost:3003')

          cy.contains('Submit').click()

          cy.contains('A fresh start')
        })

        it('A blog can be liked', function() {
            cy.contains('Add a new blog').click()
            cy.get('#title').type('A fresh start')
            cy.get('#author').type('Stefano Moscatelli')
            cy.get('#url').type('http://localhost:3003')
  
            cy.contains('Submit').click()

            cy.contains('View details').click()
            cy.contains('Like').click()
        })

        it('Blogs are ordered by ranking of likes', function() {
            cy.contains('Add a new blog').click()
            cy.get('#title').type('A fresh start')
            cy.get('#author').type('Stefano Moscatelli')
            cy.get('#url').type('http://localhost:3003')
  
            cy.contains('Submit').click()

            cy.contains('Add a new blog').click()
            cy.get('#title').type('Here again')
            cy.get('#author').type('Stefano Moscatelli')
            cy.get('#url').type('http://localhost:3003')
  
            cy.contains('Submit').click()

            cy.contains('A fresh start').parent().find('View details').click()
            cy.contains('A fresh start').parent().find('Like').click().click().click()

            cy.contains('Here again').parent().find('View details').click()
            cy.contains('Here again').parent().find('Like').click()

            cy.get('#blog-container').map((blogs) => blogs.likes).as('theArray')
            cy.get('@theArray').should('contain', '2, 1')
        })
      })
})