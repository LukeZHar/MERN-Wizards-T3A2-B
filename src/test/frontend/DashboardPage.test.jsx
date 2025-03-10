import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, vi, test, beforeEach } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom'; // Import necessary routing
import DashboardPage from '../../frontend/pages/DashboardPage'; // Adjust path as necessary
import { SnackbarProvider } from '../../frontend/contexts/SnackbarContext'; // Snackbar context provider


const renderDashboardPage = () => {
    return render(
        <SnackbarProvider>
            <MemoryRouter initialEntries={['/dashboard']}>
                <DashboardPage />
            </MemoryRouter>
        </SnackbarProvider>
    );
};

describe('DashboardPage Tests', () => {
    test('renders the dashboard title correctly', () => {
        renderDashboardPage(); // Render the DashboardPage

        expect(screen.getByText(/Dashboard/i)).toBeInTheDocument(); // Check the title is displayed
    });

    test('renders create new post button', () => {
        renderDashboardPage(); // Render the DashboardPage

        expect(screen.getByRole('button', { name: /Create New Post/i })).toBeInTheDocument(); // Check if button is present
    });

    test('shows "No posts to display" when there are no posts', async () => {
         renderDashboardPage(); // Render the DashboardPage

        await waitFor(() => {
            expect(screen.getByText(/No posts to display/i)).toBeInTheDocument(); // Check if the indication for no posts is displayed
        });
    });
});