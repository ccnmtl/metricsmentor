beforeEach(() => {
    cy.resetTestDB();
    cy.login('faculty_one', 'test');
    cy.visit('/course/1/simulations/2/');
    cy.get('input#income').click();
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
        cy.get('[data-cy="pIncome-table"]').should('exist');
        cy.get('[data-cy="black-table"]').should('exist');
        cy.get('[data-cy="size-table"]').should('exist');
    });
});

describe('Takeaway Questions', () => {
    it('only shows one initial question without feedback', () => {
        cy.get('[id="2"]').should('exist');
        cy.get('input[name="2-choices"]').each(($el) => {
            cy.wrap($el).should('not.be.checked');
        });
    });
    it('shows no feedback in the initial state', () => {
        cy.get('[role="alert"]').should('not.exist');
    });
    it('shows negative feedback', () => {
        cy.get('input#income-choice-a').click();
        cy.get('[data-cy="submit2"]').click();
        cy.get('.sim_quiz__feedback-text-incorrect').should('exist');
    });
    it('shows postive feedback', () => {
        cy.get('input#income-choice-b').click();
        cy.get('[data-cy="submit2"]').click();
        cy.get('.sim_quiz__feedback-text-correct').should('exist');
        cy.get('[data-cy="continue"]').click();
    });
    it('advances to the next topic', () => {
        cy.get('input#income-choice-b').click();
        cy.get('[data-cy="submit2"]').click();
        cy.get('.sim_quiz__feedback-text-correct').should('exist');
        cy.get('[data-cy="continue"]').click();
        cy.get('.hi-val').should('contain', '1 of 2');
        cy.get('[data-cy="income-complete"]').should('exist');
    });
});