/// <reference types="cypress" />

// import a set of selectors
import * as select from '../../../selectors/article-selectors';
import { findArticleByTitle } from '../../../selectors/feed-selectors';
import { findArticleByAboutText } from '../../../selectors/feed-selectors';

describe('New Post use cases', () => {

  before(() => {
    // cy.exec('mongorestore --drop -d conduit ~/mongodb-backup/conduit');
    cy.resetDB();
  })

  beforeEach(() => {
    cy.login(
        Cypress.env('testUser').email,
        Cypress.env('testUser').password
    );
    cy.contains('a', 'Global Feed')
    .click()
    .should('have.class', 'active');
  })

  it('verifies the seeded article from the admin user', () => {
    cy.fixture('default-article').as('article').then((article) => {
      findArticleByAboutText(article.about)
        .should('exist')
        .click();
      select.articleTitle()
        .should('have.text', article.title);
      select.articleContent()
        .should('contain.text', article.body);
    })
  });

  it('confirms user cannot edit or delete admin\'s article', () => {
    cy.fixture('default-article').as('article').then((article) => {
      findArticleByTitle(article.title)
        .click();
      select.editArticle()
        .should('not.exist');
      select.deleteArticle()
        .should('not.exist');
    })
  });

  it('user can post a comment ', () => {

    let comment = 'Here goes my comment';

    cy.fixture('default-article').as('article').then((article) => {
      // TODO: can be replaced with API call (with more occurances below)
      findArticleByTitle(article.title)
        .click();
      select.commentSection()
        .should('have.attr', 'placeholder', 'Write a comment...')
        .type(comment);
      select.postCommentButton()
        .should('be.enabled')
        .click();
      select.postedComment(comment)
        .should('exist');
    })
  });

  it('user can delete its comment', () => {
    cy.fixture('default-article').as('article').then((article) => {
      findArticleByTitle(article.title)
        .click();
      cy.pause();
      select.deleteButtonForComment(article.userComment)
        .should('exist')
        .click();
      select.deleteButtonForComment(article.userComment)
        .should('not.exist');
    })
  });

  it('user cannot delete admin\'s comment', () => {
    cy.fixture('default-article').as('article').then((article) => {
      findArticleByTitle(article.title)
        .click();
      cy.pause();
      select.deleteButtonForComment(article.adminComment)
        .should('not.exist');      
    })
  });

  })