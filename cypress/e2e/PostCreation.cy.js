describe('Post Creation', () => {
    it('should allow users to create a post', () => {
        cy.visit('https://a-ticket-a-task-it.netlify.app/login');
        cy.get('[data-testid=login-username-input]').type('testuser');
        cy.get('[data-testid=login-password-input]').type('Password123');
        cy.get('button').contains('Login').click();
        cy.url().should('include', '/dashboard');
        
        cy.get('button').contains('Create New Post').click();
        cy.get('input[name=title]').type('Test Post Title');
        cy.get('textarea[name=content]').type('This is a test post content.');
        cy.get('button').contains('Submit').click();

        cy.contains('Post created successfully!').should('be.visible');
    });
});