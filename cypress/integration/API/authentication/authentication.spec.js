/// <reference types="cypress" />

Cypress.config('baseUrl', Cypress.config('API_ROOT'));

describe('Authentication endpoint', () => {

  before(() => {
    cy.resetDB();
  });

  it('cannot login without a password', () => {
    cy.fixture('authentication/user-payloads').then((fx) => {
      cy.loginAs(fx.userNoPassword, false)
      .then((response) => {
        expect(response.status).to.equal(422);
        expect(response.body.errors.password).to.equal('can\'t be blank');
      })
    })
  });

  it('cannot login without a username', () => {
    cy.fixture('authentication/user-payloads').then((fx) => {
      cy.loginAs(fx.userNoEmail, false)
      .then((response) => {
        expect(response.status).to.equal(422);
        expect(response.body.errors.email).to.equal('can\'t be blank');
      })
    })
  });

  it('can login with proper credentials', () => {
    cy.fixture('authentication/default-user').then((fx) => {
      cy.loginAs(fx)
      .then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body.user.email).to.equal(fx.user.email);
        expect(response.body.user.token).not.to.be.empty;
      })
    })
  });

})