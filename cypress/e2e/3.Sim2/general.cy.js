// beforeEach(() => {
//     cy.resetTestDB();
//     cy.login('faculty_one', 'test');
//     cy.visit('/course/1/simulations/2/');
//     cy.get('input#income').click();
//     cy.get('input#income-choice-b').click();
//     cy.get('button[data-cy="submit2"]').click();
//     cy.get('[data-cy="continue"]').click();
//     cy.get('input#gpa4').click();
//     cy.get('input#gpa4-choice-c').click();
//     cy.get('button[data-cy="submit3"]').click();
// });

// describe('General Takeaway', () => {
//     it('shows the general takeaway question', () => {
//         cy.get('[id="1"]').should('exist');
//     });
//     it('does not show the end routes', () => {
//         // cy.get('[data-cy="continue"]')
//         //     .should('not.contain', 'Try another dataset');
//         cy.get('[data-cy="finish"]').should('not.exist');
//         cy.get('[data-cy="start-over"]').should('not.exist');
//     });
//     it('shows negative feedback', () => {
//         cy.get('input#general-choice-a').click();
//         cy.get('button[data-cy="submit1"]').click();
//         cy.get('.sim_quiz__feedback-text-incorrect').should('exist');
//     });
//     it('shows positive feedback', () => {
//         cy.get('input#general-choice-d').click();
//         cy.get('button[data-cy="submit1"]').click();
//         cy.get('.sim_quiz__feedback-text-correct').should('exist');
//     });
// });

// describe('End Routes', () => {
//     beforeEach(() => {
//         cy.get('input#general-choice-d').click();
//         cy.get('button[data-cy="submit1"]').click();
//     });
//     it('continues to a new topic', () => {
//         cy.get('[data-cy="continue"]')
//             .should('contain', 'Try another dataset');
//         cy.get('[data-cy="continue"]').click();
//         cy.get('.hi-val').should('contain', '2 of 2');
//         cy.get('[data-cy="income-complete"]').should('exist');
//         cy.get('[data-cy="gpa4-complete"]').should('exist');
//     });
//     it('starts over', () => {
//         cy.get('[data-cy="start-over"]').click();
//     });
//     it('finishes to dashboard', () => {
//         cy.get('[data-cy="finish"]').click();
//         cy.title().should('contain', 'Simulation');
//         cy.get('[data-cy="sim-2-link"]').should('be.visible');
//     });
// });