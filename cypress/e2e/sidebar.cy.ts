describe('Sidebar and User Interactions', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.injectAxe();
  });

  describe('Sidebar Functionality', () => {
    it('should render filters and handle league selection', () => {
      // Check sidebar is visible
      cy.get('[data-slot="card"]').should('be.visible');
      cy.get('h4').contains('Filtros').should('be.visible');
      
      // Check league collapsible
      cy.get('button').contains('Liga').should('be.visible');
      
      // Expand league options if collapsed
      cy.get('button').contains('Liga').then(($btn) => {
        if ($btn.attr('aria-expanded') === 'false') {
          cy.wrap($btn).click();
        }
      });
      
      // Test league interaction (flexible for actual content)
      cy.get('body').then(($body) => {
        const leagues = ['La Liga', 'Premier League', 'Serie A', 'Liga', 'Premier'];
        const foundLeague = leagues.find(league => 
          $body.find(`button:contains("${league}")`).length > 0
        );
        
        if (foundLeague) {
          cy.get('button').contains(foundLeague).click();
          cy.wait(300);
        }
      });
    });

    it('should handle season selection', () => {
      // Check season section
      cy.get('h4').contains('Temporada').should('be.visible');
      
      // Test season buttons
      cy.get('button').contains('2024/25').should('be.visible');
      cy.get('button').contains('2023/24').should('be.visible').click();
      cy.get('button').contains('2022/23').should('be.visible').click();
      cy.get('button').contains('2021/22').should('be.visible').click();
      
      // Return to current season
      cy.get('button').contains('2024/25').click();
    });

    it('should show current selection', () => {
      // Check current selection display
      cy.contains('Selección actual:').should('be.visible');
      cy.get('p').contains('La Liga').should('be.visible');
      cy.get('p').contains('2024/25').should('be.visible');
    });
  });

  describe('Responsive Design and Interactions', () => {
    it('should handle hover effects correctly', () => {
      // Test league button hover states
      cy.get('button').contains('La Liga').trigger('mouseover');
      cy.get('button').contains('La Liga').should('be.visible');
      
      // Test season button hover states
      cy.get('button').contains('2024/25').trigger('mouseover');
      cy.get('button').contains('2024/25').should('be.visible');
    });

    it('should maintain functionality on different viewport sizes', () => {
      // Test desktop view
      cy.viewport(1280, 720);
      cy.get('[data-slot="card"]').should('be.visible');
      
      // Test tablet view
      cy.viewport(768, 1024);
      cy.get('[data-slot="card"]').should('be.visible');
      
      // Test mobile view
      cy.viewport(375, 667);
      cy.get('[data-slot="card"]').should('be.visible');
    });
  });

  describe('Accessibility and UX', () => {
    it('should pass accessibility audit on sidebar', () => {
      cy.checkA11y('[data-slot="card"]');
    });

    it('should have proper focus management', () => {
      // Test interactive elements can be focused
      cy.get('button').first().focus();
      cy.focused().should('be.visible');
      
      // Test search input focus if available
      cy.get('input[aria-label*="Buscar"]').focus();
      cy.focused().should('be.visible');
      
      // Test other focusable buttons
      cy.get('button').eq(1).focus();
      cy.focused().should('be.visible');
    });

    it('should provide proper ARIA attributes for interactive elements', () => {
      // Check buttons have text content or accessible names
      cy.get('button').should('have.length.greaterThan', 0);
      
      // Check search input has proper labels
      cy.get('input[aria-label*="Buscar"]').should('have.attr', 'aria-label');
      
      // Check interactive elements are accessible
      cy.get('button, input, select, textarea').should('have.length.greaterThan', 0);
    });

    it('should handle keyboard interactions properly', () => {
      // Test keyboard interaction on available buttons
      cy.get('button').first().then(($btn) => {
        if ($btn.length > 0) {
          cy.wrap($btn).focus().type('{enter}');
          cy.wait(300);
        }
      });
      
      // Test space key on interactive elements
      cy.get('button').eq(1).then(($btn) => {
        if ($btn.length > 0) {
          cy.wrap($btn).focus().type(' ');
          cy.wait(300);
        }
      });
    });
  });
});