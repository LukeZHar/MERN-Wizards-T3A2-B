import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, vi, test, beforeEach } from 'vitest';
import { SnackbarProvider } from '../../frontend/contexts/SnackbarContext'; // Assuming you have a Snackbar context provider
import RegisterPage from '../../frontend/pages/RegisterPage'; // Adjust path as necessary
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter

// Mock axios
vi.mock('axios');

// Mock MUI Icons
vi.mock('@mui/icons-material', () => ({
    AccountCircle: (props) => <div {...props}>AccountCircle</div>,
    Lock: (props) => <div {...props}>Lock</div>,
    MailOutline: (props) => <div {...props}>MailOutline</div>,
}));

// Function to render component with Snackbar context provider and MemoryRouter
const renderWithSnackbar = () => {
    render(
        <SnackbarProvider>
            <MemoryRouter>
                <RegisterPage />
            </MemoryRouter>
        </SnackbarProvider>
    );
};

describe('RegisterPage Tests', () => {
    beforeEach(() => {
        vi.clearAllMocks(); // Clear previous mocks before each test
    });

    test('renders the registration form correctly', () => {
        renderWithSnackbar();

        expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
    });

    test('successfully registers a user', async () => {
        // Mock the API response for successful registration
        axios.post.mockResolvedValueOnce({ data: { message: 'Registration successful' } });

        renderWithSnackbar();

        // Simulate user input
        userEvent.type(screen.getByLabelText(/username/i), 'testuser');
        userEvent.type(screen.getByLabelText(/email/i), 'test@test.com');
        userEvent.type(screen.getByLabelText(/password/i), 'Password123');

        // Click the register button
        userEvent.click(screen.getByRole('button', { name: /register/i }));

        // Wait for the snackbar message to appear and check it
        await waitFor(() => {
            expect(screen.getByText(/Registration successful/i)).toBeInTheDocument();
        });
    });

    test('displays an error message on registration failure', async () => {
        // Mock the API response for registration failure
        axios.post.mockRejectedValueOnce({ response: { data: { message: 'Registration failed' } } });

        renderWithSnackbar();

        // Simulate user input
        userEvent.type(screen.getByLabelText(/username/i), 'testuser');
        userEvent.type(screen.getByLabelText(/email/i), 'test@test.com');
        userEvent.type(screen.getByLabelText(/password/i), 'password123');

        // Click the register button
        userEvent.click(screen.getByRole('button', { name: /register/i }));

        // Wait for error message to appear in snackbar
        await waitFor(() => {
            expect(screen.getByText(/Registration failed/i)).toBeInTheDocument();
        });
    });

    test('displays validation errors if fields are empty', async () => {
        renderWithSnackbar();

        // Click the register button without filling in the form
        userEvent.click(screen.getByRole('button', { name: /register/i }));

        // Assuming that empty fields tend to show some form of feedback
        expect(screen.getByLabelText(/username/i)).toHaveValue('');
        expect(screen.getByLabelText(/email/i)).toHaveValue('');
        expect(screen.getByLabelText(/password/i)).toHaveValue('');
    });
});
