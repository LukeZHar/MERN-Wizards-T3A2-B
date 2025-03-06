import React from 'react';
import { expect, test } from 'vitest';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { MemoryRouter } from 'react-router-dom'; // Use MemoryRouter for testing navigation
import Header from '../../frontend/components/Header'; 
import userEvent from '@testing-library/user-event';
import { UserAuthContextProvider } from '../../frontend/contexts/UserAuthContext'; 

const renderHeader = (mockedAuthValue) => { // Helper function to render Header with context
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

test('Display menu items when authenticated', async () => {
    const mockedValue = ['token123', () => {}, () => {}]; // Simulated authenticated user

    renderHeader(mockedValue); // Render the Header with authenticated context

    // Simulate user clicking the Menu button (update the query to find the right button)
    const menuButton = screen.getByRole('button', { name: /Menu/i });
    userEvent.click(menuButton); 

    // Check for menu options
    expect(await screen.findByText(/Home/i)).toBeInTheDocument();
    expect(await screen.findByText(/Dashboard/i)).toBeInTheDocument();
    expect(await screen.findByText(/Create Post/i)).toBeInTheDocument();
    expect(await screen.findByText(/Profile/i)).toBeInTheDocument();
});

test('Call logout function when Logout button is clicked', async () => {
    const logoutMock = vi.fn(); // Replace jest.fn() with vi.fn()
    const mockedValue = ['token123', () => {}, logoutMock]; // Use the mocked logout function

    renderHeader(mockedValue); // Render the header with authenticated context

    // Open the menu
    userEvent.click(screen.getByRole('button', { name: /Menu/i }));

    // Click the Logout button
    userEvent.click(await screen.findByText(/Logout/i));
    expect(logoutMock).toHaveBeenCalled(); // test that logout was called
});