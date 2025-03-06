import React from 'react';
import { expect, test } from 'vitest';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { MemoryRouter } from 'react-router-dom'; // Use MemoryRouter for testing navigation
import Header from '../../frontend/components/Header'; 
import userEvent from '@testing-library/user-event';
import { UserAuthContextProvider } from '../../frontend/contexts/UserAuthContext';

const renderHeader = (mockedAuthValue) => { 
    return render(
        <UserAuthContextProvider value={mockedAuthValue}>
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        </UserAuthContextProvider>
    );
};

test('Render the Header logo', () => {
    renderHeader([null, () => {}, () => {}]); // Mock context for logged-out state

    const logoElement = screen.getByAltText("MERN Logo");
    expect(logoElement).toBeInTheDocument(); // test that logo is in the document
});

test('Render the Header title', () => {
    renderHeader([null, () => {}, () => {}]); // Mock context for logged-out state

    const titleElement = screen.getByText("A Ticket a Task It");
    expect(titleElement).toBeInTheDocument(); // test that title is in the document
});

test('Show Sign In button when not authenticated', () => {
    renderHeader([null, () => {}, () => {}]); // Mock context for logged-out state

    const signInButton = screen.getByRole('button', { name: "Sign In" });
    expect(signInButton).toBeInTheDocument(); // test that the Sign In button is present
});


// Test to check if the logo navigates to "/"
test('Logo navigates to home when clicked', () => {
    const mockedValue = ['token123', () => {}, () => {}]; // Simulated authenticated user

    renderHeader(mockedValue); // Render the Header with mocked context

    const logoElement = screen.getByAltText("MERN Logo");
    userEvent.click(logoElement);

    expect(window.location.pathname).toBe('/'); // Ensure that the user is navigated to home
});
