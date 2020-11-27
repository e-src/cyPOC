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
    cy.findByPlaceholderText('Article Title')
      .should('exist');
    cy.findByPlaceholderText('What\'s this article about?')
      .should('exist');
    cy.findByPlaceholderText('Write your article (in markdown)')
      .should('exist');
    cy.findByPlaceholderText('Enter tags')
      .should('exist');
    cy.findByRole('button')
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