describe('Navigate to Sim2 from login', () => {
    it('Navigate to Sim1 from login', () => {
        cy.login('faculty_one', 'test');
        cy.visit('/');
        cy.title().should('contain', 'My Courses');
        cy.get('[data-cy="navbar"]').should('contain', 'Faculty One');
        cy.get('[data-cy="course-1"]')
            .should('contain', 'course 0');
        cy.get('[data-cy="course-1-link"]').click();
        cy.get('[data-cy="sim-2"]').should('contain', 'Simulation 2');
        cy.title().should('contain', 'Simulation');
        cy.get('[data-cy="sim-2-link"]').should('be.visible');
        cy.get('a[href="/course/1/simulations/2/"]')
            .should('be.visible').click();
        cy.get('span.h2-secondary').should('contain', 'Simulation 2');
        cy.get('[data-cy="navbar"]').should('contain', 'Faculty One');

    });

    it('Navigate to Sim1 with URL without login cached', () => {
        cy.visit('/course/1/simulations/2/');
        cy.title().should('contain', 'Log in');
    });

    it('Navigate to Sim1 with URL', () => {
        cy.login('faculty_one', 'test');
        cy.visit('/course/1/simulations/2/');
        cy.get('span.h2-secondary').should('contain', 'Simulation 2');
    });
});