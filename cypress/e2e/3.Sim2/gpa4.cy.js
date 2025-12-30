beforeEach(() => {

    cy.login('faculty_one', 'test');
    cy.visit('/course/1/simulations/2/');
    cy.get('input#gpa4').click();
});

it('has all of the sections', () => {
    cy.get('[data-cy="section1"]').should('exist');
    cy.get('[data-cy="section1"]').should('contain', 'Learning Goals');
    cy.get('[data-cy="section2"]').should('exist');
    cy.get('[data-cy="section2"]')
        .should('contain', 'Variables of Interest');
    cy.get('[data-cy="section3"]').should('exist');
    cy.get('[data-cy="section3"]').should('contain', 'Control Variables');
    cy.get('[data-cy="section4"]').should('exist');
    cy.get('[data-cy="section4"]').should('contain', 'Takeaway Questions');
});

describe('Variables of Interest', () => {
    it('has the table', () => {
        cy.get('[data-cy="voi-table"]').should('exist');
        cy.get('[data-cy="corr-header"]').should('exist');
        cy.get('[data-cy="corr-header"]')
            .should('contain', 'corr');
        cy.get('[data-cy="beta-header"]').should('exist');
        cy.get('[data-cy="beta-header"]')
            .should('contain', 'beta');
        cy.get('[data-cy="corr"]').should('exist');
        cy.get('[data-cy="beta"]').should('exist');
    });
});

describe('Control Variables', () => {
    it('has the OVB modal', () => {
        cy.get('[data-cy="ovb-modal"]').should('exist');
        cy.get('[data-cy="ovb-modal"]').click();
        cy.get('#OVBTheoryModalLabel')
            .should('contain', 'Omitted Variable Bias');
    });
    it('has no checked boxes initially', () => {
        cy.get('input[type="checkbox"].form-check-input').each(($el) => {
            cy.wrap($el).should('not.be.checked');
        });
    });
    it('shows the topic data', () => {
        cy.get('input[type="checkbox"].form-check-input').each(($el) => {
            cy.wrap($el).check();
        });
        cy.get('[data-cy="ACT-table"]').should('exist');
        cy.get('[data-cy="bgfriend-table"]').should('exist');
        cy.get('[data-cy="campus-table"]').should('exist');
        cy.get('[data-cy="skipped-table"]').should('exist');
    });
});

describe('Takeaway Questions', () => {
    it('only shows one initial question without feedback', () => {
        cy.get('[id="3"]').should('exist');
        cy.get('input[name="3-choices"]').each(($el) => {
            cy.wrap($el).should('not.be.checked');
        });
    });
    it('shows no feedback in the initial state', () => {
        cy.get('[role="alert"]').should('not.exist');
    });
    it('shows negative feedback', () => {
        cy.get('input#gpa4-choice-a').click();
        cy.get('[data-cy="submit3"]').click();
        cy.get('.sim_quiz__feedback-text-incorrect').should('exist');
    });
    it('shows postive feedback', () => {
        cy.get('input#gpa4-choice-c').click();
        cy.get('[data-cy="submit3"]').click();
        cy.get('.sim_quiz__feedback-text-correct').should('exist');
        cy.get('[data-cy="continue"]').click();
    });
    it('advances to the next topic', () => {
        cy.get('input#gpa4-choice-c').click();
        cy.get('[data-cy="submit3"]').click();
        cy.get('.sim_quiz__feedback-text-correct').should('exist');
        cy.get('[data-cy="continue"]').click();
        cy.get('.hi-val').should('contain', '1 of 2');
        cy.get('[data-cy="gpa4-complete"]').should('exist');
    });
});