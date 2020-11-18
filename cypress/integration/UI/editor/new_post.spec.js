/// <reference types="cypress" />

// import a set of selectors specific to the editor page
import * as select from '../../selectors/editor_selectors';

describe('New Post use cases', () => {

    beforeEach(() => {
        cy.login(
            Cypress.env('testUser').email,
            Cypress.env('testUser').password
        );
        cy.visit('/editor');
    })

    it('shows required UI elemets', () => {
        select.articleTitle()
          .should('have.attr', 'placeholder', 'Article Title');
        select.articleAbout()
          .should('have.attr', 'placeholder', 'What\'s this article about?');
        select.articleBody()
          .should('have.attr', 'placeholder', 'Write your article (in markdown)');  
        // TODO: find a proper css selector for the tags field
        // cy.get('input[class="form-control"]:nth-of-type(3)')
        //   .should('have.attr', 'placeholder', 'Enter tags');
        select.publishButton()
          .should('have.text', 'Publish Article')
          .and('be.enabled');
    });

  })