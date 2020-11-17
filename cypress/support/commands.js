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

import * as loginSelect from '../integration/selectors/login_selectors';

// TODO: replace with API implementation
Cypress.Commands.add("login", (email, password) => {
    cy.visit('/login');
    loginSelect.emailField()
      .type(email);
    loginSelect.passwordField()
      .type(password);
    loginSelect.submitButton()
      .click();
 });

 Cypress.Commands.add("loginAPI", (email, password) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3000/api/users/login',
    // form: true, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
    body: {
      "user": {
        "email": "user@local.host",
        "password": "user"
      }
    }
  })
})
