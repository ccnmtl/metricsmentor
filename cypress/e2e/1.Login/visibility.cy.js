describe('Visibility Controls', () => {
    beforeEach(() => {
        cy.resetTestDB();
    });

    it('Student does not see toggle buttons and respects visibility', () => {
        cy.login('faculty_one', 'test');
        cy.visit('/course/1/simulations/');

        // Wait for page to load
        cy.get('.section-sim-dashboard').should('be.visible');

        // Verify NO toggle buttons
        cy.contains('Show to Students').should('not.exist');
        cy.contains('Hide from Students').should('not.exist');
    });

    it('Student does not see toggle buttons and respects visibility', () => {
        cy.login('student_one', 'test');
        cy.visit('/course/1/simulations/');

        // Wait for page to load
        cy.get('.section-sim-dashboard').should('be.visible');

        // Verify NO toggle buttons
        cy.contains('Show to Students').should('not.exist');
        cy.contains('Hide from Students').should('not.exist');
    });
})
