/// <reference types="cypress" />

// import a set of selectors
import * as select from '../../../selectors/article-selectors';
import * as editorSelector from '../../../selectors/editor-selectors';
import { findArticleByAboutText } from '../../../selectors/feed-selectors';

describe('Article use cases', () => {

  before(() => {
    cy.resetDB();
  })

  beforeEach(() => {
    cy.loginAsDefaultUser();
    cy.visit('/');
    cy.contains('a', 'Global Feed')
    .click()
    .should('have.class', 'active');
  })

  it('verifies the seeded article from the admin user', () => {
    cy.fixture('articles/default-article').as('article').then((article) => {
      findArticleByAboutText(article.about)
        .should('exist')
        .click();
      select.articleTitle()
        .should('have.text', article.title);
      select.articleContent()
        .should('contain.text', article.body);
    })
  });

  it('confirms user cannot edit or delete admin article', () => {
    cy.fixture('articles/default-article').as('article').then((article) => {
      cy.selectArticleByTitle(article.title)
      select.editArticle()
        .should('not.exist');
      select.deleteArticle()
        .should('not.exist');
    })
  });

  it('user can post a comment', () => {

    let comment = 'Here goes my comment';

    cy.fixture('articles/default-article').as('article').then((article) => {
      cy.selectArticleByTitle(article.title)
      cy.findAllByPlaceholderText('Write a comment...')
        .should('exist')
        .type(comment);
      select.postCommentButton()
        .should('be.enabled')
        .click();
      select.postedComment(comment)
        .should('exist');
    })
  });

  it('user can delete its comment', () => {
    cy.fixture('articles/default-article').as('article').then((article) => {
      cy.selectArticleByTitle(article.title)
      select.deleteButtonForComment(article.userComment)
        .should('exist')
        .click();
      select.deleteButtonForComment(article.userComment)
        .should('not.exist');
    })
  });

  it('user cannot delete admin comment', () => {
    cy.fixture('articles/default-article').as('article').then((article) => {
      cy.selectArticleByTitle(article.title)
      select.deleteButtonForComment(article.adminComment)
        .should('not.exist');      
    })
  });

  it('user cannot edit or delete admin article', () => {
    cy.fixture('articles/default-article').then((article) => {
      cy.selectArticleByTitle(article.title)
    select.deleteArticle()
      .should('not.exist');
    select.editArticle()
      .should('not.exist');
    })    
  });

  it('user can delete their article', () => {
    cy.fixture('articles/user-articles').then((articles) => {
      cy.selectArticleByTitle(articles.articleToDelete)
    select.deleteArticle()
      .should('exist')
      .click()
    cy.contains('a', 'Your Feed')
      .should('have.class', 'active');
    }) 
  });

  it('user can edit their article', () => {

    let title = 'Edited Article';

    cy.fixture('articles/user-articles').then((articles) => {
      cy.selectArticleByTitle(articles.articleToEdit)
      select.editArticle()
        .should('exist')
        .click()
      cy.location('pathname')
        .should('contain', 'editor/article-to-edit');
      editorSelector.articleTitle()
        .type('{selectall}{backspace}' + title);
      editorSelector.publishButton()
        .click();
      cy.contains('h1', title);
    })
  });

})