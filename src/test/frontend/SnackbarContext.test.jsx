import React from 'react';
import { expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SnackbarProvider, useSnackbar } from '../../frontend/contexts/SnackbarContext'; 
import { MemoryRouter } from 'react-router-dom';

// Test component to show snackbar
const TestComponent = () => {
    const showSnackbar = useSnackbar();

    return (
        <button onClick={() => showSnackbar("Test Snackbar")}>Show Snackbar</button>
    );
};

test('shows snackbar when the button is clicked', async () => {
    render(
        <SnackbarProvider>
            <MemoryRouter>
                <TestComponent />
            </MemoryRouter>
        </SnackbarProvider>
    );

    // Click the button to show snackbar
    userEvent.click(screen.getByRole('button', { name: /Show Snackbar/i }));

    // Expect the snackbar message to be visible
    const snackbarMessage = await screen.findByText("Test Snackbar");
    expect(snackbarMessage).toBeInTheDocument();


});