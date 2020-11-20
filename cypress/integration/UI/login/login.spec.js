/// <reference types="cypress" />

// import a set of selectors specific to the login page
import * as select from '../../../selectors/login-selectors';

describe('Login page use cases', () => {

  before(() => {
    cy.resetDB();
  })

  beforeEach(() => {
      cy.visit('/login');
  })

  it('shows required UI elemets', () => {
      cy.contains('h1', 'Sign In');
      cy.contains('Need an account?')
        .should('have.attr', 'href', '/register');
  });

  it('requires email', () => {
      select.submitButton()
        .click();
      select.errorMessage()
        .should('contain', 'email can\'t be blank');       
  });

  it('requires password', () => {
      select.emailField()
        .type(Cypress.env('testUser').email);
      select.submitButton()
        .click();
      select.errorMessage()
        .should('contain', 'password can\'t be blank');
  });

  it('requires valid username and password', () => {
      select.emailField()
        .type(Cypress.env('testUser').email);
      select.passwordField()
        .type('invalid-password{enter}');
      select.errorMessage()
        .should('contain', 'email or password is invalid');
  });

  it('logins successfully', () => {
      select.emailField()
        .type(Cypress.env('testUser').email);
      select.passwordField()
        .type(Cypress.env('testUser').password);
      select.submitButton()
        .click();
      cy.location('pathname').should('equal', '/');
  })

})