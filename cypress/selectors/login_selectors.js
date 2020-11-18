/// <reference types="cypress" />

// locators
export const SUBMIT_BUTTON = 'button[type=submit]';
export const ERROR_MESSAGES = '.error-messages';
export const EMAIL_FIELD = 'input[type="email"]';
export const PASSWORD_FIELD = 'input[type="password"]';

// getters
export const submitButton = () => cy.get(SUBMIT_BUTTON);
export const errorMessage = () => cy.get(ERROR_MESSAGES);
export const emailField = () => cy.get(EMAIL_FIELD);
export const passwordField = () => cy.get(PASSWORD_FIELD);