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

// import * as loginSelect from '../selectors/login-selectors';

Cypress.Commands.add("resetDB", () => {
  cy.exec('mongorestore --drop -d conduit cypress/db-sample/conduit');
});

Cypress.Commands.add("loginAs", (user, failOnStatusCode) => {
  
  // check if 2nd parameter has been passed
  let validRequest = typeof failOnStatusCode === 'boolean' ? failOnStatusCode : true

  cy.request({
    method: 'POST',
    url: `${Cypress.config('API_ROOT')}/users/login`,
    body: user,
    failOnStatusCode: validRequest
  })
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

  cy.request({
    method: 'POST',
    url: `${Cypress.config('API_ROOT')}/users`,
    body: user,
    failOnStatusCode: validRequest
  })
});

Cypress.Commands.add("getCurrentUser", () => {
  cy.request({
    method: 'GET',
    url: `${Cypress.config('API_ROOT')}/user`,
    headers: {
      'authorization': `Token ${window.localStorage.getItem('jwt')}`
    }
  })
});

Cypress.Commands.add("updateUser", (requestBody, failOnStatusCode) => {

  // check if 2nd parameter has been passed
  let validRequest = typeof failOnStatusCode === 'boolean' ? failOnStatusCode : true

  cy.request({
    method: 'PUT',
    url: `${Cypress.config('API_ROOT')}/user`,
    body: requestBody,
    headers: {
      'authorization': `Token ${window.localStorage.getItem('jwt')}`
    },
    failOnStatusCode: validRequest
  })
});

Cypress.Commands.add("getProfile", (profileName) => {
  cy.request({
    method: 'GET',
    url: `${Cypress.config('API_ROOT')}/profiles/${profileName}`,
    headers: {
      'authorization': `Token ${window.localStorage.getItem('jwt')}`
    }
  })
});

Cypress.Commands.add("followUser", (userName) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.config('API_ROOT')}/profiles/${userName}/follow`,
    headers: {
      'authorization': `Token ${window.localStorage.getItem('jwt')}`
    }
  })
});

Cypress.Commands.add("unfollowUser", (userName) => {
  cy.request({
    method: 'DELETE',
    url: `${Cypress.config('API_ROOT')}/profiles/${userName}/follow`,
    headers: {
      'authorization': `Token ${window.localStorage.getItem('jwt')}`
    }
  })
});