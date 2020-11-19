/// <reference types="cypress" />

// locators
export const ARTICLE_TITLE = '//div[@class="container"]/h1';
export const ARTICLE_CONTENT = 'div[class="row article-content"]';
export const EDIT_ARTICLE = 'a[class="btn btn-outline-secondary btn-sm"]';
export const DELETE_ARTICLE = 'button[class="btn btn-outline-danger btn-sm"]';
export const COMMENT_SECTION = 'textarea[class="form-control"]';
export const POST_COMMENT_BUTTON = 'button[type="submit"]';

// getters
export const articleTitle = () => cy.xpath(ARTICLE_TITLE);
export const articleContent = () => cy.get(ARTICLE_CONTENT);
export const editArticle = () => cy.get(EDIT_ARTICLE);
export const deleteArticle = () => cy.get(DELETE_ARTICLE);
export const commentSection = () => cy.get(COMMENT_SECTION);
export const postCommentButton = () => cy.get(POST_COMMENT_BUTTON);

// parametrized getters
export const postedComment = (comment) => cy.xpath(`//p[contains(text(), "${comment}")]`);
// I'm not proud of this one. TODO: look for a better solution
export const deleteButtonForComment = (comment) => {
    return cy.xpath(`//p[contains(text(),"${comment}")]/parent::div/following-sibling::div[@class="card-footer"]/span[@class="mod-options"]`);
}
