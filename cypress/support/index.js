// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';
import addContext from 'mochawesome/addContext';

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Import xpath command. Source: https://github.com/cypress-io/cypress-xpath
require('cypress-xpath');

// code that will be listening on the test:after:run event (for adding the screenshot to the test result)
Cypress.on('test:after:run', (test, runnable) => {

  if (test.state === 'failed') {
    let item = runnable
    const nameParts = [runnable.title]

    while (item.parent) {
      nameParts.unshift(item.parent.title)
      item = item.parent
    }

    if (runnable.hookName) {
      nameParts.push(`${runnable.hookName} hook`)
    }

    const fullTestName = nameParts
            .filter(Boolean)
            .join(' -- ')

    const imageUrl = `screenshots/${
      Cypress.spec.name
    }/${fullTestName} (failed).png`

    addContext({ test }, imageUrl)
  }
});