beforeEach(() => {
    cy.login('student_one', 'test');
    cy.visit('/course/1/simulations/2/');
});

describe('Simulation 2 Initial Setup', () => {
    it('should load the correct page', () => {
        cy.title().should('contain', 'Simulation');
        cy.get('span.h2-secondary').should('contain', 'Simulation 2');
        cy.get('svg').should('be.visible');
    });
    it('displays the Learning Goals section', () => {
        cy.get('h2.h2-primary').should('contain', 'Learning Goals');
    });
    it('starts with no selected topic', () => {
        cy.get('input.form-check-input').each(($el) => {
            cy.wrap($el).should('not.be.checked');
        });
        cy.get('[data-cy="attribution-text"]').should('not.exist');
    });
});
