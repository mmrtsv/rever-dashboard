describe('Dashboard Rever Test', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })
    it('Smoke Test login', () => {
        cy.get('[data-testid="username-input"]').type('admin@partner.com')
        cy.get('[data-testid="password-input"]').type(
            'Rever2022DashboardPassword'
        ) 
        cy.get('[data-testid="Header"]').should('not.exist')
        cy.get('[data-testid="sign-in-button"]').click()
        cy.get('[data-testid="Header"]').should('exist')
    })
})
