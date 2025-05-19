beforeEach(() => {
    cy.login('faculty_one', 'test');
});

describe('Heteroskedasticity', () => {
    beforeEach(() => {
        cy.visit('/course/1/simulations/3/');
    });

    it('is the correct page.', () => {
        cy.title().should('contain', 'Simulation');
        cy.get('span.h2-secondary').should('contain', 'Simulation 3');
        cy.get('svg').should('be.visible');
    });

    it('displays the initial section as Heteroskedasticiy', () => {
        cy.get('h2.h2-primary').should(
            'contain', 'What is Heteroskedasticity?');
        cy.get('button').contains('Heteroskedasticity')
            .should('be.disabled');
        cy.get('button').contains('Multicollinearity')
            .should('not.be.disabled');
    });

    describe('What is Heteroskedasticity?', () => {
        it('accepts range input', () => {
            cy.get('input#skedasticityscale').invoke('val', 3);
            cy.get('input#skedasticityscale').should('have.value', 3);
        });
        it('preserves the minimum value', () => {
            cy.get('input#skedasticityscale').invoke('val', 0.1);
            cy.get('input#skedasticityscale').should('have.value', 0.2);
        });
        it('preserves the maximum value', () => {
            cy.get('input#skedasticityscale').invoke('val', 5);
            cy.get('input#skedasticityscale').should('have.value', 4.5);
        });
        it('has an active button to the Real dataset', () => {
            cy.get('[data-cy="open-real-data"]')
                .should('contain', 'Continue to Real dataset');
        });
    });

    describe('Real dataset problem', () => {
        beforeEach(() => {
            cy.get('[data-cy="open-real-data"]').click();
            cy.get('h2#heteroskedasticityRealData').should('be.visible');
        });
        it('shows correct feedback on responses', () => {
            cy.get('#option1-1').click();
            cy.get('[data-cy="submit1"]').click();
            cy.get('div.answer-incorrect').should('be.visible');
            cy.get('#option2-1').should('not.exist');
            cy.get('#option1-0').click();
            cy.get('[data-cy="submit1"]').click();
            cy.get('div.answer-correct').should('be.visible');
        });
        it('navigates through the mini quiz', () => {
            cy.get('#option1-0').click();
            cy.get('[data-cy="submit1"]').click();
            cy.get('#option2-1').click();
            cy.get('[data-cy="submit2"]').click();
            cy.get('[data-cy="to-takeaway"]').click();
        });
    });

    describe('Takeaway Questions - Heteroskedasticity', () => {
        beforeEach(() => {
            cy.get('[data-cy="open-real-data"]').click();
            cy.get('#option1-0').click();
            cy.get('[data-cy="submit1"]').click();
            cy.get('#option2-1').click();
            cy.get('[data-cy="submit2"]').click();
            cy.get('[data-cy="to-takeaway"]').click();
        });

        describe('Navigate through the Takeaways', () => {
            beforeEach(() => {
                cy.get('input#hetero-choice-C').click();
                cy.get('[data-cy="submit3"]').click();
                cy.get('input#hetero2-choice-C').click();
                cy.get('[data-cy="submit4"]').click();
                cy.get('input#hetero3-choice-A').click();
                cy.get('[data-cy="submit5"]').click();
            });
            it('can get to Multicollinearity', () => {
                cy.get('[data-cy="finish-to-multicollinearity"]').click();
                cy.get('h2#whatIsMulticollinearity').should('be.visible');
            });
        });
    });

    describe('Heteroskedasticity Modal', () => {
        it('should open definition modal', () => {
            cy.get('[data-cy="define-heteroskedasticity"]').click();
            cy.get('div.modal-content').should('be.visible');
            cy.get('h5.modal-title').first()
                .should('have.text','Heteroskedasticity Definition');
            cy.get('figure.modal-graph').should('be.visible');
            cy.get('[data-cy="heteroskedDefinition-close"]')
                .should('be.visible');
            cy.get('[data-cy="heteroskedDefinition-close"]')
                .click();
        });
        it('should open the glossary modal', () => {
            cy.get('[data-cy="glossary"]').click();
            cy.get('div.modal-content').should('be.visible');
            cy.get('h5#simulationThreeGlossaryLabel')
                .should('have.text','Glossary of Terms');
            cy.get('table.table').should('be.visible');
            cy.get('[data-cy="simulationThreeGlossary-close"]')
                .should('be.visible');
            cy.get('[data-cy="simulationThreeGlossary-close"]')
                .click();
        });
    });
});

describe('Multicollinearity', () => {
    beforeEach(() => {
        cy.visit('/course/1/simulations/3/');
        cy.get('button').contains('Multicollinearity').click();
    });

    it('has Multicollinearity as the active pathway', () => {
        cy.get('h2#learningObjective')
            .contains('Learning objectives: Multicollinearity');
    });

    describe('What is Multicollinearity?', () => {
        describe('Equation Data', () => {
            it('shows x2 line equation', () => {
                cy.get('input#x_2').check();
                cy.get('[data-cy="x2equation"]').should('be.visible');
            });
            it('shows x3 line equation', () => {
                cy.get('input#x_3').check();
                cy.get('[data-cy="x3equation"]').should('be.visible');
            });
            it('shows all line equations', () => {
                cy.get('input#x_2').check();
                cy.get('input#x_3').check();
                cy.get('[data-cy="x2equation"]').should('be.visible');
                cy.get('[data-cy="x3equation"]').should('be.visible');
            });
        });
        it('can reach the Real Data section', () => {
            cy.get('[data-cy="open-real-data"]')
                .should('contain', 'Continue to Real dataset');
        });
    });

    describe('Real dataset problem', () => {
        beforeEach(() => {
            cy.get('[data-cy="open-real-data"]').click();
        });

        it('is in the Real Data section', () => {
            cy.get('h2#multicollinearityRealData').should('be.visible');
        });

        describe('Equation Data', () => {
            it('shows x2 line equation', () => {
                cy.get('input#x_2').check();
                cy.get('[data-cy="x2equation"]').should('be.visible');
            });
            it('shows x3 line equation', () => {
                cy.get('input#x_3').check();
                cy.get('[data-cy="x3equation"]').should('be.visible');
            });
            it('shows all line equations', () => {
                cy.get('input#x_2').check();
                cy.get('input#x_3').check();
                cy.get('[data-cy="x2equation"]').should('be.visible');
                cy.get('[data-cy="x3equation"]').should('be.visible');
            });
        });
        describe('Mini Quiz', () => {
            it('shows correct feedback on response', () => {
                cy.get('input#option6-0').click();
                cy.get('[data-cy="submit6"]').click();
                cy.get('.answer-incorrect').should('be.visible');
                cy.get('input#option6-1').click();
                cy.get('[data-cy="submit6"]').click();
                cy.get('.answer-correct').should('be.visible');
            });
            it('opens the Critical Value Table', () => {
                cy.get('input#option6-1').click();
                cy.get('[data-cy="submit6"]').click();
                cy.get('[data-cy="critical-value"]').click();
                cy.get('div.modal-content').should('be.visible');
                cy.get('h5#criticalValModalLabel').first()
                    .should('have.text',
                        'Critical Values for F-test Distribution');
                cy.get('figure.modal-graph').should('be.visible');
                cy.get('[data-cy="criticalValModal-close"]')
                    .should('be.visible');
                cy.get('[data-cy="criticalValModal-close"]')
                    .click();
            });
            it('navigates the Real Data section', () => {
                cy.get('input#option6-1').click();
                cy.get('[data-cy="submit6"]').click();
                cy.get('input#option7-0').click();
                cy.get('[data-cy="submit7"]').click();
                cy.get('[data-cy="to-takeaway"]')
                    .should('contain', 'Continue');
            });
        });
    });

    describe('Takeaway questions - Multicollinearity', () => {
        beforeEach(() => {
            cy.get('[data-cy="open-real-data"]').click();
            cy.get('input#option6-1').click();
            cy.get('[data-cy="submit6"]').click();
            cy.get('input#option7-0').click();
            cy.get('[data-cy="submit7"]').click();
            cy.get('[data-cy="to-takeaway"]').click();
        });

        describe('Navigate through the Takeaways', () => {
            beforeEach(() => {
                cy.get('input#multi-choice-D').click();
                cy.get('[data-cy="submit8"]').click();
                cy.get('input#multi2-choice-C').click();
                cy.get('[data-cy="submit9"]').click();
                cy.get('input#multi3-choice-C').click();
                cy.get('[data-cy="submit10"]').click();
            });

            it('can get to Multicollinearity', () => {
                cy.get('[data-cy="finish-to-heteroskedasticity"]').click();
                cy.get('h2.h2-primary').should(
                    'contain', 'What is Heteroskedasticity?');
            });
        });
    });

    describe('Multicollinearity Modal', () => {
        it('should open definition modal', () => {
            cy.get('[data-cy="MulticollinearityGlossary"]').click();
            cy.get('div.modal-content').should('be.visible');
            cy.get('h5.modal-title').first()
                .should('have.text','Multicollinearity Definition');
            cy.get('[data-cy="MulticollinearityGlossary-close"]')
                .should('be.visible');
            cy.get('[data-cy="MulticollinearityGlossary-close"]')
                .click();
        });
        it('should open the glossary modal', () => {
            cy.get('[data-cy="glossary"]').click();
            cy.get('div.modal-content').should('be.visible');
            cy.get('h5#simulationThreeGlossaryLabel')
                .should('have.text','Glossary of Terms');
            cy.get('table.table').should('be.visible');
            cy.get('[data-cy="simulationThreeGlossary-close"]')
                .should('be.visible');
            cy.get('[data-cy="simulationThreeGlossary-close"]')
                .click();
        });
    });
});

