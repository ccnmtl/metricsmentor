// beforeEach(() => {
//     cy.login('student_one', 'test');
//     cy.visit('/course/1/simulations/1/');
// });

// describe('cy.login() works as expected', () => {
//     it('should be able to log in', () => {
//         cy.title().should('contain', 'Simulation');
//     });
// });

// describe('Verify the page', () => {
//     it('Is the correct page.', () => {
//         cy.title().should('contain', 'Simulation');
//         cy.get('span.h2-secondary').should('contain', 'Simulation 1');
//         cy.get('svg').should('be.visible');
//     });
// });

// describe('Graph Data', () => {
//     it('Graph Seeding', () => {
//         cy.get('h2.h2-primary')
//             .should('contain', 'Graph seeding');
//         // cy.get('label input[value="seedString"]').should('exist');
//     });
//     it('Graph Coefficients', () => {
//         cy.get('h2.h2-primary')
//             .should('contain', 'Resulting graph coefficients');
//     });
//     it('Null Hypothesis', () => {
//         cy.get('[data-cy="nullNextButton"]').click();
//         cy.get('h2.h2-primary')
//             .should('contain', 'Defining null hypothesis');
//     });

// });
