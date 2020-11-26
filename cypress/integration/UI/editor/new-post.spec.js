/// <reference types="cypress" />

// import a set of selectors
import * as select from '../../../selectors/editor-selectors';
import { articleContent } from '../../../selectors/article-selectors';

describe('New Post use cases', () => {

  before(() => {
    cy.resetDB();
  })

  beforeEach(() => {
      cy.loginAsDefaultUser();
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
    cy.fixture("articles/article-to-post-by-user").then((fx) => {
      cy.populateArticle(fx);
      // confirm article details after publishing
      cy.contains('h1', fx.article.title);
      articleContent()
        .should('contain', fx.article.body);
    })
  });

})