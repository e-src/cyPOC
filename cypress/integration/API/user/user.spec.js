/// <reference types="cypress" />

Cypress.config('baseUrl', Cypress.config('API_ROOT'));

describe('Authentication endpoint', () => {

  before(() => {
    cy.resetDB();
  });

  beforeEach(() => {
    cy.loginAsDefaultUser();
  });

  it('gets current User', () => {
    cy.fixture("authentication/default-user").then((fx) => {
      cy.request({
        method: 'GET',
        url: '/user',
        headers: {
          'authorization': `Token ${window.localStorage.getItem('jwt')}`
        }
      }).then((response) => {
        expect(response.body.user.email).to.equal(fx.user.email);
      })
    })
  });

})