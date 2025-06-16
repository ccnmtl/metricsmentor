describe('Navigate to Sim3 from login', () => {
    it('Navigate to Sim3 from login', () => {
        cy.login('faculty_one', 'test');
        cy.visit('/');
        cy.title().should('contain', 'My Courses');
        cy.get('[data-cy="navbar"]').should('contain', 'Faculty One');
        cy.get('[data-cy="course-1"]')
            .should('contain', 'course 0');
        cy.get('[data-cy="course-1-link"]').click();
        cy.get('[data-cy="sim-3"]').should('contain', 'Simulation 3');
        cy.title().should('contain', 'Simulation');
        cy.get('[data-cy="sim-3-link"]').should('be.visible');
        cy.get('a[href="/course/1/simulations/3/"]')
            .should('be.visible').click();
        cy.get('span.h2-secondary').should('contain', 'Simulation 3');
        cy.get('[data-cy="navbar"]').should('contain', 'Faculty One');

    });

    it('Navigate to Sim3 with URL without login cached', () => {
        cy.visit('/course/1/simulations/3/');
        cy.title().should('contain', 'Log in');
    });

    it('Navigate to Sim3 with URL', () => {
        cy.login('faculty_one', 'test');
        cy.visit('/course/1/simulations/3/');
        cy.get('span.h2-secondary').should('contain', 'Simulation 3');
    });
});