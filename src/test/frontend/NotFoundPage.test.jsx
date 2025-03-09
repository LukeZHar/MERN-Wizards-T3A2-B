import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, vi, test, beforeEach } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom'; // Import Routes and Route for more control
import NotFoundPage from '../../frontend/pages/NotFoundPage'; // Adjust path as necessary

const renderNotFoundPage = () => {
    return render(
        <MemoryRouter initialEntries={['/notfound']}> {/* Set initial path to simulate navigation */}
            <Routes>
                <Route path="*" element={<NotFoundPage />} />
                <Route path="/dashboard" element={<div>Dashboard</div>} /> {/* Dummy route for navigation */}
            </Routes>
        </MemoryRouter>
    );
};

describe('NotFoundPage Tests', () => {
    beforeEach(() => {
        vi.clearAllMocks(); // Clear previous mocks before each test
    });

    test('renders 404 message correctly', () => {
        render(
            <MemoryRouter>
                <NotFoundPage />
            </MemoryRouter>
        );

        expect(screen.getByText(/404 - Page Not Found/i)).toBeInTheDocument();
        expect(screen.getByText(/Sorry, the page you are looking for does not exist./i)).toBeInTheDocument();
    });

    test('navigates to home when button is clicked', async () => {
        render(
            <MemoryRouter>
                <NotFoundPage />
            </MemoryRouter>
        );

        userEvent.click(screen.getByRole('button', { name: /Go to Home/i }));

        expect(window.location.pathname).toBe('/'); // Verify if navigate was called correctly
    });
});


