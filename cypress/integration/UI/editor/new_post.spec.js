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
        select.articleTags()
          .should('have.attr', 'placeholder', 'Enter tags');
        select.publishButton()
          .should('have.text', 'Publish Article')
          .and('be.enabled');
    });

    it('publishes a new post', () => {

      let title = 'Look at this cool article!';
      let about = 'This article is about.. nothing, really.';
      let body = 'How much ground would a groundhog hog, if a groundhog could hog ground?\n' +
      'A groundhog would hog all the ground he could hog, if a groundhog could hog ground.';

      select.articleTitle()
        .type(title);
      select.articleAbout()
        .type(about);
      select.articleBody()
        .type(body);
      select.publishButton()
        .click();
      cy.contains('h1', title);
      cy.get('div.row article-content')
        .should('contain', body);
    });

  })