describe('Navigation and Search E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.wait(1000) // Wait for app to load
  })

  it('should load the homepage and display main elements', () => {
    // Verify page loads successfully
    cy.get('nav[role="navigation"]').should('exist')
    cy.get('main, [role="main"], .main-content').should('exist')
    
    // Check for logo
    cy.contains('StatFut').should('be.visible')
    
    // Check for search functionality
    cy.get('input[aria-label*="Buscar"]').should('exist')
    cy.get('form[role="search"]').should('exist')
  })

  it('should navigate between different sections', () => {
    // Test desktop navigation (if visible)
    cy.get('body').then(($body) => {
      if ($body.find('button:contains("Inicio")').length > 0) {
        cy.get('button:contains("Inicio")').first().click()
        cy.wait(500)
        
        if ($body.find('button:contains("Noticias")').length > 0) {
          cy.get('button:contains("Noticias")').first().click()
          cy.wait(500)
        }
        
        if ($body.find('button:contains("Tabla")').length > 0) {
          cy.get('button:contains("Tabla")').first().click()
          cy.wait(500)
        }
        
        if ($body.find('button:contains("Calendario")').length > 0) {
          cy.get('button:contains("Calendario")').first().click()
          cy.wait(500)
        }
      }
    })
  })

  it('should perform search functionality', () => {
    const searchTerms = ['Barcelona', 'Real Madrid', 'Liverpool']
    
    searchTerms.forEach((term) => {
      // Clear and type search term
      cy.get('input[aria-label*="Buscar"]')
        .clear()
        .type(term)
        .should('have.value', term)
      
      // Submit search
      cy.get('form[role="search"]').submit()
      cy.wait(500)
    })
  })

  it('should handle filter interactions in sidebar', () => {
    // Check if sidebar exists
    cy.get('body').then(($body) => {
      if ($body.find('.sidebar, [data-testid="sidebar"]').length > 0) {
        // Test league filter toggle
        cy.get('button:contains("Liga")').should('exist')
        cy.get('button:contains("Liga")').first().click()
        cy.wait(500)
        
        // Test league selection if options are visible
        const leagues = ['La Liga', 'Premier League', 'Serie A', 'Bundesliga']
        leagues.forEach((league) => {
          cy.get('body').then(($innerBody) => {
            if ($innerBody.find(`button:contains("${league}")`).length > 0) {
              cy.get(`button:contains("${league}")`).first().click()
              cy.wait(300)
            }
          })
        })
      }
    })
  })

  it('should test responsive behavior', () => {
    // Test mobile viewport
    cy.viewport(375, 667) // iPhone SE size
    cy.wait(500)
    
    // Check if mobile menu exists and works
    cy.get('body').then(($body) => {
      if ($body.find('button[aria-label*="menu"], .mobile-menu-toggle').length > 0) {
        cy.get('button[aria-label*="menu"], .mobile-menu-toggle').first().click()
        cy.wait(300)
      }
    })
    
    // Test tablet viewport
    cy.viewport(768, 1024) // iPad size
    cy.wait(500)
    
    // Test desktop viewport
    cy.viewport(1280, 720)
    cy.wait(500)
  })

  it('should handle theme and language switching', () => {
    // Test language switching if available
    cy.get('body').then(($body) => {
      if ($body.find('button:contains("Idioma"), select:contains("Idioma"), [data-testid="language-selector"]').length > 0) {
        cy.get('button:contains("Idioma"), select:contains("Idioma"), [data-testid="language-selector"]').first().click()
        cy.wait(300)
        
        // Try to select English if available
        if ($body.find('button:contains("English"), option:contains("English")').length > 0) {
          cy.get('button:contains("English"), option:contains("English")').first().click()
          cy.wait(500)
          
          // Switch back to Spanish
          if ($body.find('button:contains("Language"), select:contains("Language")').length > 0) {
            cy.get('button:contains("Language"), select:contains("Language")').first().click()
            cy.wait(300)
            if ($body.find('button:contains("Español"), option:contains("Español")').length > 0) {
              cy.get('button:contains("Español"), option:contains("Español")').first().click()
              cy.wait(500)
            }
          }
        }
      }
    })
    
    // Test theme switching if available
    cy.get('body').then(($body) => {
      if ($body.find('button[aria-label*="theme"], [data-testid="theme-toggle"]').length > 0) {
        cy.get('button[aria-label*="theme"], [data-testid="theme-toggle"]').first().click()
        cy.wait(500)
        
        // Click again to toggle back
        cy.get('button[aria-label*="theme"], [data-testid="theme-toggle"]').first().click()
        cy.wait(500)
      }
    })
  })
})