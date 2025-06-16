beforeEach(() => {
    cy.login('faculty_one', 'test');
    cy.visit('/course/1/simulations/2/');
    cy.get('input#campus_sim2').click();
    cy.get('input#income').click();
    cy.get('input#income-choice-1').click();
    cy.get('button[data-cy="submit-income"]').click();
    cy.get('[data-cy="continue"]').click();
    cy.get('input#gpa4').click();
    cy.get('input#gpa4-choice-2').click();
    cy.get('button[data-cy="submit-gpa4"]').click();
});

describe('General Takeaway', () => {
    it('shows the general takeaway question', () => {
        cy.get('#general-question').should('exist');
    });
    it('does not show the end routes', () => {
        cy.get('[data-cy="continue"]')
            .should('not.contain', 'Try another dataset');
        cy.get('[data-cy="finish"]').should('not.exist');
        cy.get('[data-cy="start-over"]').should('not.exist');
    });
    it('shows negative feedback', () => {
        cy.get('input#general-choice-0').click();
        cy.get('button[data-cy="submit-general"]').click();
        cy.get('.text-danger[role="alert"]').should('exist');
    });
    it('shows positive feedback', () => {
        cy.get('input#general-choice-3').click();
        cy.get('button[data-cy="submit-general"]').click();
        cy.get('.text-success[role="alert"]').should('exist');
    });
});

describe('End Routes', () => {
    beforeEach(() => {
        cy.get('input#general-choice-3').click();
        cy.get('button[data-cy="submit-general"]').click();
    });
    it('continues to a new topic', () => {
        cy.get('[data-cy="continue"]')
            .should('contain', 'Try another dataset');
        cy.get('[data-cy="continue"]').click();
        cy.get('.hi-val').should('contain', '2 of 2');
        cy.get('[data-cy="income-complete"]').should('exist');
        cy.get('[data-cy="gpa4-complete"]').should('exist');
    });
    it('starts over', () => {
        cy.get('[data-cy="start-over"]').click();
    });
    it('finishes to dashboard', () => {
        cy.get('[data-cy="finish"]').click();
        cy.title().should('contain', 'Simulation');
        cy.get('[data-cy="sim-2-link"]').should('be.visible');
    });
});