/// <reference types="cypress" />

// import a set of selectors specific to the editor page
// import * as select from '../../selectors/login_selectors.js';

describe('New Post use cases', () => {

    beforeEach(() => {
        // cy.login(
            // Cypress.env('testUser').email,
            // Cypress.env('testUser').password
        // );
        cy.loginAPI('-', '-');
        cy.visit('/editor');
    })

    it('shows required UI elemets', () => {
        cy.get('input[class="form-control form-control-lg"]')
          .should('have.attr', 'placeholder', 'Article Title');
        cy.get('input[class="form-control"]')
          .should('have.attr', 'placeholder', 'What\'s this article about?');
        cy.get('textarea[class="form-control"]')
          .should('have.attr', 'placeholder', 'Write your article (in markdown)');  
        // TODO: find a proper css selector for the tags field
        // cy.get('input[class="form-control"]:nth-of-type(3)')
        //   .should('have.attr', 'placeholder', 'Enter tags');
        cy.contains('button', 'Publish Article')
          .should('be.enabled');
    });

  })