describe('User Flow', () => {
  it('should allow users to register and login', () => {
    cy.visit('https://a-ticket-a-task-it.netlify.app/register');

    // Ensure we are on the register page
    cy.url().should('include', '/register');

    // Register a new user
    cy.get('[data-testid=username-input]').type('testuser');
    cy.get('[data-testid=email-input]').type('testuser@example.com');
    cy.get('[data-testid=password-input]').type('Password123');
    cy.get('button').contains('Register').click();

    // Check that the login page is displayed
    cy.url().should('include', '/login');

    // Login with the new user
    cy.get('[data-testid=login-username-input]').type('testuser');
    cy.get('[data-testid=login-password-input]').type('Password123');
    cy.get('button').contains('Login').click();

    // Check that the dashboard is displayed
    cy.url().should('include', '/dashboard');
    cy.contains('Dashboard').should('be.visible');
  });
});