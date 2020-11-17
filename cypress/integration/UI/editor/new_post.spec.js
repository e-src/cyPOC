/// <reference types="cypress" />

// import a set of selectors specific to the editor page
// import * as select from '../../selectors/login_selectors.js';

describe('New Post use cases', () => {

    beforeEach(() => {
        cy.login(
            Cypress.env('testUser').email,
            Cypress.env('testUser').password
        );
        cy.visit('/editor');
    })

    it('shows required UI elemets', () => {
        cy.contains('button', 'Publish Article')
          .should('be.enabled');
    });

  })