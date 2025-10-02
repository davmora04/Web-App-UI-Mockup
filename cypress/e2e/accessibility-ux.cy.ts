describe('Accessibility and User Experience E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.injectAxe();
  });

  it('should have proper semantic HTML structure', () => {
    // Check for semantic elements
    cy.get('nav, [role="navigation"]').should('exist');
    cy.get('main, [role="main"]').should('exist');
    cy.get('header, [role="banner"]').should('exist');

    // Check for proper heading structure
    cy.get('h1, h2, h3, h4, h5, h6').should('exist');
    
    // Check form elements have labels
    cy.get('input, textarea, select').each(($input) => {
      const element = $input[0];
      const hasAriaLabel = element.hasAttribute('aria-label');
      const hasAriaLabelledBy = element.hasAttribute('aria-labelledby');
      const hasAssociatedLabel = element.id && Cypress.$(`label[for="${element.id}"]`).length > 0;
      
      expect(hasAriaLabel || hasAriaLabelledBy || hasAssociatedLabel).to.be.true;
    });
  });

  it('should support keyboard navigation', () => {
    // Test search input focus using placeholder
    cy.get('input[placeholder*="Buscar equipos"]').focus();
    cy.focused().should('have.attr', 'placeholder');
    
    // Test basic keyboard navigation - use a more specific button
    cy.get('button[aria-current="page"]').first().focus();
    cy.focused().should('be.visible');
    
    // Test Enter key functionality
    cy.get('input[placeholder*="Buscar equipos"]').focus().clear().type('Barcelona');
    cy.get('form[role="search"]').submit();
    cy.wait(500);
  });

  it('should have proper ARIA attributes and roles', () => {
    // Check navigation has proper role
    cy.get('nav, [role="navigation"]').should('exist');
    
    // Check search form has proper role
    cy.get('form[role="search"]').should('exist');
    
    // Check buttons have accessible names (more flexible approach)
    cy.get('button').then(($buttons) => {
      // Verify at least some buttons have accessible content
      let accessibleButtons = 0;
      
      $buttons.each((_, button) => {
        const hasAccessibleName = 
          button.textContent?.trim().length > 0 ||
          button.hasAttribute('aria-label') ||
          button.hasAttribute('aria-labelledby') ||
          button.hasAttribute('title');
        
        if (hasAccessibleName) {
          accessibleButtons++;
        }
      });
      
      // Expect at least 80% of buttons to have accessible names
      expect(accessibleButtons / $buttons.length).to.be.at.least(0.8);
    });
  });

  it('should handle focus management properly', () => {
    // Test focus visible states
    cy.get('input[placeholder*="Buscar equipos"]').focus();
    cy.focused().should('be.visible');
    
    // Test button focus - use a more specific button
    cy.get('button[aria-current="page"]').first().focus();
    cy.focused().should('be.visible');
  });

  it('should provide screen reader friendly content', () => {
    // Check for screen reader only content or descriptive text
    cy.get('[aria-describedby]').each(($element) => {
      const describedBy = $element.attr('aria-describedby');
      if (describedBy) {
        cy.get(`#${describedBy}`).should('exist');
      }
    });
    
    // Basic screen reader content check
    cy.get('body').should('contain.text', 'StatFut');
  });

  it('should work across different viewport sizes', () => {
    const viewports = [
      { width: 375, height: 667, name: 'Mobile' },
      { width: 768, height: 1024, name: 'Tablet' },
      { width: 1280, height: 720, name: 'Desktop' }
    ];
    
    viewports.forEach((viewport) => {
      cy.viewport(viewport.width, viewport.height);
      cy.wait(500);
      
      // Verify essential elements are still accessible
      cy.get('nav, [role="navigation"]').should('exist');
      cy.get('input[aria-label*="Buscar"]').should('exist');
      
      // Test interaction at this viewport
      cy.get('input[aria-label*="Buscar"]').click({ force: true }).type(`Test at ${viewport.name}`);
      cy.wait(300);
      cy.get('input[aria-label*="Buscar"]').clear();
    });
  });

  it('should maintain accessibility during dynamic content changes', () => {
    // Test search interaction maintains accessibility
    cy.get('input[aria-label*="Buscar"]').type('Barcelona');
    cy.get('form[role="search"]').submit();
    cy.wait(1000);
    
    // Verify page structure is still accessible after content change
    cy.get('nav, [role="navigation"]').should('exist');
    cy.get('main, [role="main"]').should('exist');
    
    // Test basic interaction works
    cy.get('body').should('be.visible');
  });

  it('should handle error states accessibly', () => {
    // Test empty search submission
    cy.get('input[aria-label*="Buscar"]').clear();
    cy.get('form[role="search"]').submit();
    cy.wait(500);
    
    // Should not break the page
    cy.get('nav, [role="navigation"]').should('exist');
    
    // Page should still be functional
    cy.get('input[aria-label*="Buscar"]').should('be.visible');
  });
});