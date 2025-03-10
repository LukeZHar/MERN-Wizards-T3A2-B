import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, vi, test, beforeEach } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom'; // Import necessary routing
import Home from '../../frontend/pages/Home'; // Adjust path as necessary

// Function to render Home component within MemoryRouter
const renderHome = () => {
    render(
        <MemoryRouter initialEntries={['/']}> {/* Set initial path */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<div>Register Page</div>} /> {/* Dummy route for navigation */}
            </Routes>
        </MemoryRouter>
    );
};

describe('Home Tests', () => {
    beforeEach(() => {
        vi.clearAllMocks(); // Clear previous mocks before each test
    });

    test('renders welcome message and brand logo', () => {
        renderHome(); // Render the Home component

        expect(screen.getByText(/Welcome to friendly and efficient task management/i)).toBeInTheDocument(); // Check for welcome message
        expect(screen.getByAltText(/Brand Logo/i)).toBeInTheDocument(); // Check that the brand logo is rendered
    });

    test('renders the "Register for access" button', () => {
        renderHome(); // Render the Home component

        expect(screen.getByRole('button', { name: /Register for access/i })).toBeInTheDocument(); // Check that the button is present
    });
});