beforeEach(() => {
    cy.login('student_one', 'test');
    cy.visit('/course/1/simulations/1/');
});

describe('Verify the page', () => {
    it('Is the correct page.', () => {
        cy.title().should('contain', 'Simulation');
        cy.get('span.h2-secondary').should('contain', 'Simulation 1');
        cy.get('svg').should('be.visible');
    });
});

describe('Simulation 1 Initial Setup', () => {
    it('should load the correct page', () => {
        cy.title().should('contain', 'Simulation');
        cy.get('span.h2-secondary').should('contain', 'Simulation 1');
        cy.get('svg').should('be.visible');
    });
    it('should display the initial graph seeding section', () => {
        cy.get('h2.h2-primary').should('contain', 'Graph seeding');
    });
    it('should display the resulting graph coefficients section', () => {
        cy.get('h2.h2-primary').should(
            'contain', 'Resulting graph coefficients');
    });
    it('should navigate to the null hypothesis section', () => {
        cy.get('[data-cy="nullNextButton"]').click();
        cy.get('h2.h2-primary').should('contain', 'Defining null hypothesis');
    });
});

describe('Graph Data', () => {
    it('Graph Seeding', () => {
        cy.get('h2.h2-primary')
            .should('contain', 'Graph seeding');
    });
    it('Graph Coefficients', () => {
        cy.get('h2.h2-primary')
            .should('contain', 'Resulting graph coefficients');
    });
    it('Null Hypothesis', () => {
        cy.get('[data-cy="nullNextButton"]').click();
        cy.get('h2.h2-primary')
            .should('contain', 'Defining null hypothesis');
    });
});

describe('Null Hypothesis', () => {
    it('should navigate through resulting graph coefficients', () => {
        cy.get('[data-cy="nullNextButton"]').click();
        cy.get('#null-hypothesis').should(
            'contain', 'Defining null hypothesis');
    });
    it('should allow selecting a different null hypothesis', () => {
        cy.get('button').contains('Continue').first().click();
        cy.get('input[name="nullHypothesis"]').clear();
        cy.get('input[name="nullHypothesis"]').type('1');
        cy.get('input[name="nullHypothesis"]').should('have.value', '1');
    });

    it('should submit the selected hypothesis and proceed', () => {
        cy.get('button').contains('Continue').first().click();
        cy.get('#gotoTesting2d').click();
        cy.get('#quiz-1').should('contain', 'Alternative hypothesis');
    });
});

describe('Alternative Hypothesis', () => {
    it('should navigate through the alternative hypothesis section', () => {
        cy.get('button').contains('Continue').first().click();
        // cy.get('#gotoTesting2d').click();
        cy.get('#quiz-1').should('contain', 'Alternative hypothesis');
    });

    it('should show alternate hypothesis A', () => {
        cy.get('#choice-A').should('contain', 'Check');
        cy.get('#choice-A').click();
        cy.get('#significance5').click();
        cy.get('#alphaNextButton').click();
        cy.get('[data-cy="pvalueSection"]').should('contain', 'Obtain');
    });
});

describe('P-Value and Critical Value', () => {
    it('allows entering a p-value and critical value and validating', () => {
        cy.get('#choice-A').click();
        cy.get('#significance5').click();
        cy.get('#alphaNextButton').click();
        cy.get('#pValue').type('0.05');
        cy.get('#pvalueInputButton').contains('Continue').click();
        cy.get('.answer-incorrect-container').should('exist');
        cy.get('[data-cy="pvalueanswer"]').invoke('text').then((text) => {
            cy.get('#pValue').clear();
            cy.get('#pValue').type(text);
            cy.get('#pvalueInputButton').contains('Continue').click();
            cy.get('.answer-correct-container').should('exist');
            const pValue = parseFloat(text);
            if (pValue > 0.05) {
                cy.get('#pGreaterThanAlpha').click();
            } else {
                cy.get('#pLessThanAlpha').click();
            }
            cy.get('[data-cy="pvalueComparisonButton"]').click();
            if (pValue > 0.05) {
                cy.get('#failToRejectHypothesis').click();
            } else {
                cy.get('#rejectHypothesis').click();
            }
            cy.get('[data-cy="hypothesisTest1Button"]').click();
        });
        cy.get('#criticalvalue').type('1.96');
        cy.get('[data-cy="criticalValueButton"]').click();
        cy.get('#tGreaterThanCritical').click();
        cy.get('[data-cy="criticalValueCompareButton"]').click();
    });
});
