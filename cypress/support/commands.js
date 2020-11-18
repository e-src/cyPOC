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

 Cypress.Commands.add("login", (email, password) => {

  // TODO: needs refactoring. does not properly authentifcate at the moment

  // cy.request({
  //   method: 'POST',
  //   url: `${Cypress.config('API_ROOT')}/users/login`,
  //   body: {
  //     "user": {
  //       "email": email,
  //       "password": password
  //     }
  //   }
  // })

  cy.visit('/login');
  loginSelect.emailField()
    .type(email);
  loginSelect.passwordField()
    .type(password);
  loginSelect.submitButton()
    .click();

})
