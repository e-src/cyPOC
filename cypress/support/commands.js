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

Cypress.Commands.add("login", (email, password) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.config('API_ROOT')}/users/login`,
    body: {
      "user": {
        "email": email,
        "password": password
      }
    }
  })
  .then((response) => {
    window.localStorage.setItem('jwt', response.body.user.token);
  })
  cy.visit('/');
});

Cypress.Commands.add("loginAsDefaultUser", () => {
  cy.fixture('authentication/default-user').then((fx) => {
    cy.request({
      method: 'POST',
      url: `${Cypress.config('API_ROOT')}/users/login`,
      body: fx
    })
    .then((response) => {
      window.localStorage.setItem('jwt', response.body.user.token);
    })
  })
});

Cypress.Commands.add("resetDB", () => {
  cy.exec('mongorestore --drop -d conduit cypress/db-sample/conduit');
});
