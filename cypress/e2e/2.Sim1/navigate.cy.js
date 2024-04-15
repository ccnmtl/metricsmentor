// import { App } from '../../../media/js/src/app';

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
});

describe('Navigate to Sim1 from login', () => {
    // it('React App should be active at "/course"', () => {
    //     cy.mount(<App />)
    //     cy.get('a').should('have.class', 'active')
    // });
    it('Navigate to Sim1 from login', () => {
        cy.login('faculty_one', 'test');
        cy.visit('/').wait(0);
        cy.title().should('contain', 'My Courses');
        cy.get('[data-cy="navbar"]').should('contain', 'Faculty One');
        cy.get('[data-cy="course-1"]')
            .should('contain', 'course 0').click().wait(0);
        cy.get('[data-cy="course-1-link"]')
            .should('be.visible').click().wait(0)
        // cy.title().should('contain', 'Simulation');
        // cy.get('[data-cy="navbar"]').should('contain', 'Faculty One');
        // cy.get('[data-cy="title-1"]').should('contain', 'Simulation 1');
        // cy.get('a[href="/course/1/simulations/1/"]').
        //     should('be.visible').click();
        // cy.get('span.h2-secondary').should('contain', 'Simulation 1');
    });

    it('Navigate to Sim1 with URL without login cached', () => {
        cy.visit('/course/1/simulations/1/').wait(0);
        cy.title().should('contain', 'Log in');
    });

    it('Navigate to Sim1 with URL', () => {
        cy.login('faculty_one', 'test');
        cy.visit('/course/1/simulations/1/').wait(0);
        // cy.get('span.h2-secondary').should('contain', 'Simulation 1');
    });
});