/// <reference types="cypress" />

// locators
export const ARTICLE_TITLE = 'input[class="form-control form-control-lg"]';
export const ARTICLE_ABOUT = 'form > fieldset > fieldset:nth-child(2) > input';
export const ARTICLE_BODY = 'textarea[class="form-control"]';
export const ARTICLE_TAGS = 'form > fieldset > fieldset:nth-child(4) > input';
export const PUBLISH_BUTTON = 'button[type=button]';


// getters
export const articleTitle = () => cy.get(ARTICLE_TITLE);
export const articleAbout = () => cy.get(ARTICLE_ABOUT);
export const articleBody = () => cy.get(ARTICLE_BODY);
export const articleTags = () => cy.get(ARTICLE_TAGS);
export const publishButton = () => cy.get(PUBLISH_BUTTON);
