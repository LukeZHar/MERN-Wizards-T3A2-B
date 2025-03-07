import React from 'react';
import { expect, test, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { MemoryRouter } from 'react-router-dom'; // Use MemoryRouter for testing navigation
import Header from '../../frontend/components/Header'; 
import userEvent from '@testing-library/user-event';
import { UserAuthContextProvider } from '../../frontend/contexts/UserAuthContext';

// Mock function to simulate localStorage
const mockLocalStorage = (mockUserId) => {
    Object.defineProperty(window, 'localStorage', {
        value: {
            getItem: () => mockUserId, // Return a mock user ID
            setItem: () => {},
            removeItem: () => {},
        },
        writable: true,
    });
};

const renderHeader = (mockedAuthValue) => { 
    return render(
        <UserAuthContextProvider value={mockedAuthValue}>
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        </UserAuthContextProvider>
    );
};

test.skip('Render the Header logo', () => {
    mockLocalStorage('');
    renderHeader([null, () => {}, () => {}]); // Mock context for logged-out state

    const logoElement = screen.getByAltText("MERN Logo");
    expect(logoElement).toBeInTheDocument(); // test that logo is in the document
});

test.skip('Render the Header title', () => {
    mockLocalStorage('');
    renderHeader([null, () => {}, () => {}]); // Mock context for logged-out state

    const titleElement = screen.getByText("A Ticket a Task It");
    expect(titleElement).toBeInTheDocument(); // test that title is in the document
});

test.skip('Show Sign In button when not authenticated', () => {
    mockLocalStorage('');
    renderHeader([null, () => {}, () => {}]); // Mock context for logged-out state

    const signInButton = screen.getByRole('button', { name: "Sign In" });
    expect(signInButton).toBeInTheDocument(); // test that the Sign In button is present
});


// Test to check if the logo navigates to "/"
test.skip('Logo navigates to home when clicked', () => {
    mockLocalStorage('mockUserId');
    const mockedValue = ['token123', () => {}, () => {}]; // Simulated authenticated user

    renderHeader(mockedValue); // Render the Header with mocked context

    const logoElement = screen.getByAltText("MERN Logo");
    userEvent.click(logoElement);

    expect(window.location.pathname).toBe('/'); // Ensure that the user is navigated to home
});

test.skip('Display menu items when authenticated', async () => {
    mockLocalStorage('mockUserId'); // Set up localStorage mock for logged-in state
    const mockedValue = ['token123', () => {}, () => {}]; // Simulated authenticated user

    renderHeader(mockedValue); // Render Header with mocked context

    // Simulate user clicking the Menu button
    userEvent.click(screen.getByRole('button', { name: 'Menu' })); 

    // Check for menu options
    expect(await screen.findByText(/Home/i)).toBeInTheDocument();
    expect(await screen.findByText(/Dashboard/i)).toBeInTheDocument();
    expect(await screen.findByText(/Create Post/i)).toBeInTheDocument();
    expect(await screen.findByText(/Profile/i)).toBeInTheDocument();
});