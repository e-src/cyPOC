/// <reference types="cypress" />

// locators
export const ARTICLE_TITLE = '//div[@class="container"]/h1';

// getters
export const articleTitle = () => cy.xpath(ARTICLE_TITLE);

// parametrized getters
export const findArticleByTitle = (title) => cy.xpath(`//h1[contains(text(),'${title}')]`);
export const findArticleByAboutText = (about) => cy.xpath(`//p[contains(text(),'${about}')]`);