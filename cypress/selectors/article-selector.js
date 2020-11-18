/// <reference types="cypress" />

// locators
export const ARTICLE_CONTENT = 'div[class="row article-content"]';


// getters
export const articleContent = () => cy.get(ARTICLE_CONTENT);
