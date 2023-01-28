describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user1 = {
      name: 'dhiaa',
      username: 'ashendhiaa',
      password: '1041'
    }
    const user2 = {
      name: 'root',
      username: 'root',
      password: '10410'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user1)
    cy.request('POST', 'http://localhost:3003/api/users/', user2)

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Blogs')
    cy.contains('Username')
    cy.contains('Password')
    cy.contains('Login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('ashendhiaa')
      cy.get('#password').type('1041')
      cy.get('#login-button').click()

      cy.contains('ashendhiaa logged-in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('ashendhiaa')
      cy.get('#password').type('1042')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'border-color', 'rgb(239, 68, 68)')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'ashendhiaa', password: '1041' })
    })

    it('A blog can be created', function () {
      cy.contains('New Blog').click()
      cy.contains('Title').parent().find('input')
        .type('ReactJs')
      cy.contains('Author').parent().find('input')
        .type('Dhiaa')
      cy.contains('URL').parent().find('input')
        .type('reactjs.org')
      cy.contains('Create').click()
      cy.contains('ReactJs')
      cy.get('.correct')
        .should('contain', 'a new blog " ReactJs " added')
        .and('have.css', 'border-color', 'rgb(34, 197, 94)')
    })

    it('A blog can be liked', function () {
      cy.contains('New Blog').click()
      cy.contains('Title').parent().find('input')
        .type('Icy')
      cy.contains('Author').parent().find('input')
        .type('Kim Petras')
      cy.contains('URL').parent().find('input')
        .type('kimpetras.com')
      cy.contains('Create').click()
      cy.contains('li', 'Icy')
        .get('#viewOrHide').click().parent()
        .get('#like').click().parent()
        .and('contain', 'Likes :1')
    })

    it('A blog can be deleted', function () {
      cy.contains('New Blog').click()
      cy.contains('Title').parent().find('input')
        .type('Icy')
      cy.contains('Author').parent().find('input')
        .type('Kim Petras')
      cy.contains('URL').parent().find('input')
        .type('kimpetras.com')
      cy.contains('Create').click()

      cy.contains('li', 'Icy')
        .get('#viewOrHide').click().parent()
        .get('#delete').click()

      cy.contains('li', 'Icy').should('not.exist')
    })

    it('A blog cannot be deleted by another user', function () {
      cy.contains('New Blog').click()
      cy.contains('Title').parent().find('input')
        .type('Icy')
      cy.contains('Author').parent().find('input')
        .type('Kim Petras')
      cy.contains('URL').parent().find('input')
        .type('kimpetras.com')
      cy.contains('Create').click()

      cy.login({ username: 'root', password: '10410' })
      cy.visit('http://localhost:3000')

      cy.contains('li', 'Icy')
        .get('#viewOrHide').click().parent()
        .get('#delete').should('have.css', 'display', 'none')

    })

    it('Blogs are filtered from most liked to less liked', function () {

      //Creating Blogs

      cy.contains('New Blog').click()
      cy.contains('Title').parent().find('input')
        .type('Icy')
      cy.contains('Author').parent().find('input')
        .type('Kim Petras')
      cy.contains('URL').parent().find('input')
        .type('kimpetras.com')
      cy.contains('Create').click()

      cy.contains('New Blog').click()
      cy.contains('Title').parent().find('input')
        .type('Brrr')
      cy.contains('Author').parent().find('input')
        .type('Kim Petras')
      cy.contains('URL').parent().find('input')
        .type('kimpetras.com')
      cy.contains('Create').click()

      //Clicking View and Like for 1st Blog

      cy.contains('li', 'Icy')
        .find('#viewOrHide').as('firstView')

      cy.get('@firstView').click()

      cy.wait(3000)

      cy.get('@firstView').parent()
        .find('#like').as('firstLike')

      cy.get('@firstLike').click()

      //Clicking View and Like for 2nd Blog

      cy.contains('li', 'Brrr')
        .find('#viewOrHide').as('secondView')

      cy.get('@secondView').click()

      cy.wait(3000)

      cy.get('@secondView').parent()
        .find('#like').as('secondLike')

      cy.get('@secondLike').click()

      cy.wait(3000)

      cy.get('@secondLike').click()

      cy.wait(3000)

      cy.get('li').eq(0).should('contain', 'Brrr')
      cy.get('li').eq(1).should('contain', 'Icy')
    })
  })

})