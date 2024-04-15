Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
});

describe('Log In Feature: Test Invalid login', () => {
    it('should not log in', () => {
        cy.visit('/accounts/login/');
        cy.title().should('contain', 'Log in');
        // cy.get('#cu-privacy-notice-button').click();
        cy.get('#guest-login').click();
        cy.get('form[name="login_local"] div.login-local-form')
            .should('be.visible');
        cy.get('#id_username').type('foo').blur();
        cy.get('#id_password').type('foo').blur();
        cy.get('form[name="login_local"] button[type="submit"]').click();
        cy.title().should('contain', 'Log in');
    });
});

describe('Log In Feature: Test Instructor Login', () => {
    it('Logs in as faculty_one', () => {
        cy.visit('/accounts/login/');
        cy.title().should('contain', 'Log in');
        // cy.get('#cu-privacy-notice-button').click();
        cy.get('#guest-login').click();
        cy.get('form[name="login_local"] div.login-local-form')
            .should('be.visible');
        cy.get('#id_username').type('faculty_one').blur();
        cy.get('#id_password').type('test').blur();
        cy.get('form[name="login_local"] button[type="submit"]').click();
        cy.title().should('contain', 'My Courses');
        cy.get('.navbar').should('contain', 'Faculty One');
    });
});

describe('Log In Feature: Test Student Login', () => {
    it('should test student login', () => {
        cy.visit('/accounts/login/');
        cy.title().should('contain', 'Log in');
        // cy.get('#cu-privacy-notice-button').click();
        cy.get('#guest-login').click();
        cy.get('form[name="login_local"] div.login-local-form')
            .should('be.visible');
        cy.get('#id_username').type('student_one').blur();
        cy.get('#id_password').type('test').blur();
        cy.get('form[name="login_local"] button[type="submit"]').click();
        cy.title().should('contain', 'My Courses');
        cy.get('.navbar').should('contain', 'Student One');
    });
});
