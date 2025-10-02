// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Custom commands for our app
Cypress.Commands.add('visitHome', () => {
  cy.visit('/')
  cy.get('[data-testid="app-loaded"]', { timeout: 10000 }).should('exist')
})

Cypress.Commands.add('searchFor', (query: string) => {
  cy.get('input[aria-label*="Buscar"]').clear().type(query)
  cy.get('form[role="search"]').submit()
})

Cypress.Commands.add('selectLeague', (leagueName: string) => {
  cy.get('button').contains('Liga').click()
  cy.get('button').contains(leagueName).click()
})

Cypress.Commands.add('checkAccessibility', () => {
  // Basic accessibility checks
  cy.get('main, [role="main"]').should('exist')
  cy.get('nav, [role="navigation"]').should('exist')
  
  // Check for proper heading structure
  cy.get('h1, h2, h3, h4, h5, h6').should('exist')
  
  // Check for alt text on images
  cy.get('img').each(($img) => {
    cy.wrap($img).should('have.attr', 'alt')
  })
  
  // Check for form labels
  cy.get('input, textarea, select').each(($input) => {
    const id = $input.attr('id')
    const ariaLabel = $input.attr('aria-label')
    const ariaLabelledby = $input.attr('aria-labelledby')
    
    if (id) {
      cy.get(`label[for="${id}"]`).should('exist')
    } else {
      expect(ariaLabel || ariaLabelledby).to.exist
    }
  })
})

// Type definitions
declare namespace Cypress {
  interface Chainable {
    visitHome(): Chainable<Element>
    searchFor(query: string): Chainable<Element>
    selectLeague(leagueName: string): Chainable<Element>
    checkAccessibility(context?: string): Chainable<Element>
  }
}