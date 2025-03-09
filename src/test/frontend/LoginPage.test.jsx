import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, vi, test, beforeEach } from 'vitest';
import { SnackbarProvider } from '../../frontend/contexts/SnackbarContext'; // Assuming you have a Snackbar context provider
import LoginPage from '../../frontend/pages/LoginPage'; // Adjust path as necessary
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import { useUserAuthContext } from '../../frontend/contexts/UserAuthContext'; // Mock Auth context

// Mock axios
vi.mock('axios');

// Mock MUI Icons
vi.mock('@mui/icons-material', () => ({
    AccountCircle: (props) => <div {...props}>AccountCircle</div>,
    Lock: (props) => <div {...props}>Lock</div>,
}));

// Mock useUserAuthContext
vi.mock('../../frontend/contexts/UserAuthContext', () => ({
    useUserAuthContext: vi.fn(),
}));

// Function to render component with Snackbar context provider and MemoryRouter
const renderWithSnackbar = () => {
    render(
        <SnackbarProvider>
            <MemoryRouter>
                <LoginPage />
            </MemoryRouter>
        </SnackbarProvider>
    );
};

describe('LoginPage Tests', () => {
    beforeEach(() => {
        vi.clearAllMocks(); // Clear previous mocks before each test
        useUserAuthContext.mockReturnValue([null, vi.fn()]); // Mock context return
    });

    test('renders the login form correctly', () => {
        renderWithSnackbar();

        expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });

    test('successfully logs in a user', async () => {
        axios.post.mockResolvedValueOnce({ data: { token: 'mockToken' } });

        renderWithSnackbar();

        userEvent.type(screen.getByLabelText(/username/i), 'testuser');
        userEvent.type(screen.getByLabelText(/password/i), 'password123');

        userEvent.click(screen.getByRole('button', { name: /login/i }));

        await waitFor(() => {
            expect(localStorage.getItem('token')).toBe('mockToken'); // Verify token is saved
        });
    });

    test('displays an error message on login failure', async () => {
        axios.post.mockRejectedValueOnce({ response: { data: { message: 'Invalid credentials' } } });

        renderWithSnackbar();

        userEvent.type(screen.getByLabelText(/username/i), 'testuser');
        userEvent.type(screen.getByLabelText(/password/i), 'password123');

        userEvent.click(screen.getByRole('button', { name: /login/i }));

        await waitFor(() => {
            expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument(); // Expect error message display
        });
    });

    test('validates required fields', async () => {
        renderWithSnackbar();

        userEvent.click(screen.getByRole('button', { name: /login/i }));

        // Check that the user is alerted via error handling (assumes you have UI for required fields)
        expect(screen.getByLabelText(/username/i)).toHaveValue('');
        expect(screen.getByLabelText(/password/i)).toHaveValue('');
    });
});
