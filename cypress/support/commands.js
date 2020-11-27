// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import * as editorSelector from '../selectors/editor-selectors';

Cypress.Commands.add("resetDB", () => {
  cy.exec('mongorestore --drop -d conduit cypress/db-sample/conduit');
});

Cypress.Commands.add("loginAs", (user, failOnStatusCode) => {
  cy.log(`--> Logging in as ${user.user.email}`);
  // check if 2nd parameter has been passed
  let validRequest = typeof failOnStatusCode === 'boolean' ? failOnStatusCode : true
  cy.api({
    method: 'POST',
    url: `${Cypress.config('API_ROOT')}/users/login`,
    body: user,
    failOnStatusCode: validRequest
  }, `login as ${user.user.email}`)
  .then((response) => {
    if(validRequest)
      window.localStorage.setItem('jwt', response.body.user.token);
  })
});

Cypress.Commands.add("loginAsDefaultUser", () => {
  cy.fixture('authentication/default-user').then((fx) => {
    cy.loginAs(fx);
  })
});

Cypress.Commands.add("registerUser", (user, failOnStatusCode) => {
  // check if 2nd parameter has been passed
  let validRequest = typeof failOnStatusCode === 'boolean' ? failOnStatusCode : true
  cy.log('--> Registering a user');
  cy.api({
    method: 'POST',
    url: `${Cypress.config('API_ROOT')}/users`,
    body: user,
    failOnStatusCode: validRequest
  }, 'register user')
});

Cypress.Commands.add("getCurrentUser", () => {
  cy.log('--> Getting current user');
  cy.api({
    method: 'GET',
    url: `${Cypress.config('API_ROOT')}/user`,
    headers: {
      'authorization': `Token ${window.localStorage.getItem('jwt')}`
    }
  }, 'get current user')
});

Cypress.Commands.add("updateUser", (requestBody, failOnStatusCode) => {
  cy.log('--> Updating user');
  // check if 2nd parameter has been passed
  let validRequest = typeof failOnStatusCode === 'boolean' ? failOnStatusCode : true
  cy.api({
    method: 'PUT',
    url: `${Cypress.config('API_ROOT')}/user`,
    body: requestBody,
    headers: {
      'authorization': `Token ${window.localStorage.getItem('jwt')}`
    },
    failOnStatusCode: validRequest
  }, 'update user')
});

Cypress.Commands.add("getProfile", (profileName) => {
  cy.log(`--> Getting profile ${profileName}`);
  cy.api({
    method: 'GET',
    url: `${Cypress.config('API_ROOT')}/profiles/${profileName}`,
    headers: {
      'authorization': `Token ${window.localStorage.getItem('jwt')}`
    }
  }, `get profile ${profileName}`)
});

Cypress.Commands.add("followUser", (userName) => {
  cy.log(`--> Following user ${userName}`);
  cy.api({
    method: 'POST',
    url: `${Cypress.config('API_ROOT')}/profiles/${userName}/follow`,
    headers: {
      'authorization': `Token ${window.localStorage.getItem('jwt')}`
    }
  }, `follow user ${userName}`)
});

Cypress.Commands.add("unfollowUser", (userName) => {
  cy.log(`--> Unfollowing user ${userName}`);
  cy.api({
    method: 'DELETE',
    url: `${Cypress.config('API_ROOT')}/profiles/${userName}/follow`,
    headers: {
      'authorization': `Token ${window.localStorage.getItem('jwt')}`
    }
  }, `unfollow user ${userName}`)
});

// TODO: add tags support later on
Cypress.Commands.add("populateArticle", (articleFx) => {
  cy.log('--> Populating the article');
  editorSelector.articleTitle()
    .type(articleFx.article.title);
  editorSelector.articleAbout()
    .type(articleFx.article.description);
  editorSelector.articleBody()
    .type(articleFx.article.body);
  editorSelector.publishButton()
  .click();
});

Cypress.Commands.add("selectArticleByTitle", (articleTitle) => {
  cy.log(`--> Selecting article ${articleTitle}`);
  cy.xpath(`//h1[contains(text(),'${articleTitle}')]`)
    .click();
});