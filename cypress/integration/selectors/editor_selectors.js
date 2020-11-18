/// <reference types="cypress" />

// locators
export const ARTICLE_TITLE = 'input[class="form-control form-control-lg"]';
export const ARTICLE_ABOUT = 'input[class="form-control"]';
export const ARTICLE_BODY = 'textarea[class="form-control"]';
export const PUBLISH_BUTTON = 'button[type=button]';


// getters
export const articleTitle = () => cy.get(ARTICLE_TITLE);
export const articleAbout = () => cy.get(ARTICLE_ABOUT);
export const articleBody = () => cy.get(ARTICLE_BODY);
export const publishButton = () => cy.get(PUBLISH_BUTTON);
