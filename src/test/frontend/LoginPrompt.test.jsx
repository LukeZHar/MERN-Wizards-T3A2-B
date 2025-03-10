import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import LoginPrompt from '../../frontend/components/LoginPrompt'; // Adjust the path as necessary

// Mock component to test navigation
const LoginPage = () => <div>Login Page</div>;

test('renders default message', () => {
    render(
        <MemoryRouter>
            <LoginPrompt />
        </MemoryRouter>
    );

    // Check if the default message is displayed
    expect(screen.getByText("You must be logged in to view this page.")).toBeInTheDocument();
});

test('renders custom message', () => {
    render(
        <MemoryRouter>
            <LoginPrompt message="Custom message" />
        </MemoryRouter>
    );

    // Check if the custom message is displayed
    expect(screen.getByText("Custom message")).toBeInTheDocument();
});

test('navigates to login page when button is clicked', async () => {
    render(
        <MemoryRouter initialEntries={['/not-logged-in']}>
            <Routes>
                <Route path="/not-logged-in" element={<LoginPrompt />} />
                <Route path="/login" element={<LoginPage />} /> {/* Mock Login Page for Navigation */}
            </Routes>
        </MemoryRouter>
    );

    // Simulate click on "Go to Login" button
    await userEvent.click(screen.getByRole('button', { name: /Go to Login/i }));

    // Assert that the login page content is displayed
    expect(screen.getByText("Login Page")).toBeInTheDocument();
});