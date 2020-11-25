/// <reference types="cypress" />

Cypress.config('baseUrl', Cypress.config('API_ROOT'));

describe('Registration endpoint', () => {

  before(() => {
    cy.resetDB();
  });

  it('successfully registers a user', () => {
    cy.fixture('registration/user-karen').then((fx) => {
      cy.registerUser(fx)
        .then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body.user.username).to.equal(fx.user.username);
            expect(response.body.user.token).not.to.be.empty;
        })
    })
  });

  it('verifies responses for incomplete requests', () => {
    // showcase of a data driven test
    cy.fixture('registration/users-incomplete').then((fixture) => {
      cy.wrap(fixture)
        .each(fx => {
          cy.registerUser(fx.request, false)
          .then((response) => {
            expect(response.status).to.equal(fx.status);
            expect(response.body).to.deep.equal(fx.response);
          })
        })
    })  
  });

})