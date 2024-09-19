// describe('Navigate to Sim1 from login', () => {
//     it('Navigate to Sim1 from login', () => {
//         cy.login('faculty_one', 'test');
//         cy.visit('/');
//         cy.title().should('contain', 'My Courses');
//         cy.get('[data-cy="navbar"]').should('contain', 'Faculty One');
//         cy.get('[data-cy="course-1"]')
//             .should('contain', 'course 0');
//         cy.get('[data-cy="course-1-link"]').click();
//         cy.get('[data-cy="sim-1"]').should('contain', 'Simulation 1');
//         cy.title().should('contain', 'Simulation');
//         cy.get('[data-cy="sim-1-link"]').should('be.visible');
//         cy.get('a[href="/course/1/simulations/1/"]')
//             .should('be.visible').click();
//         cy.get('span.h2-secondary').should('contain', 'Simulation 1');
//         cy.get('[data-cy="navbar"]').should('contain', 'Faculty One');

//     });

//     it('Navigate to Sim1 with URL without login cached', () => {
//         cy.visit('/course/1/simulations/1/');
//         cy.title().should('contain', 'Log in');
//     });

//     it('Navigate to Sim1 with URL', () => {
//         cy.login('faculty_one', 'test');
//         cy.visit('/course/1/simulations/1/');
//         cy.get('span.h2-secondary').should('contain', 'Simulation 1');
//     });
// });