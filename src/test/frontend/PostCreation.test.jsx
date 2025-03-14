import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, beforeEach, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import PostCreation from '../../frontend/pages/PostCreation'; // Adjust path as necessary
import { SnackbarProvider } from '../../frontend/contexts/SnackbarContext';
import { UserAuthContextProvider } from '../../frontend/contexts/UserAuthContext';
import axios from 'axios';

// Mock axios
vi.mock('axios');

// Mock function to simulate localStorage
const mockLocalStorage = (mockUserId) => {
    Object.defineProperty(window, 'localStorage', {
        value: {
            getItem: () => mockUserId, // Return a mock user ID
            setItem: () => { },
            removeItem: () => { },
        },
        writable: true,
    });
};

// Function to render PostCreation component with Snackbar and Auth context
const renderPostCreation = () => {
    render(
        <UserAuthContextProvider value={['token123', vi.fn()]}>
            <SnackbarProvider>
                <MemoryRouter>
                    <PostCreation />
                </MemoryRouter>
            </SnackbarProvider>
        </UserAuthContextProvider>
    );
};

describe('PostCreation Component Tests', () => {
    beforeEach(() => {
        vi.clearAllMocks(); // Clear previous mocks before each test
        mockLocalStorage('mockUserId'); // Simulate a logged-in state
    });

    test('renders PostCreation component', () => {
        renderPostCreation(); // Render the PostCreation component

        expect(screen.getByText(/Create a New Post/i)).toBeInTheDocument(); // Check if title is displayed
        expect(screen.getByLabelText(/Title/i)).toBeInTheDocument(); // Check Title input field
        expect(screen.getByLabelText(/Content/i)).toBeInTheDocument(); // Check Content textarea
        expect(screen.getByText(/Priority:/i)).toBeInTheDocument(); // Check Priority label
        expect(screen.getByText(/Category:/i)).toBeInTheDocument(); // Check Category label
        expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument(); // Check Submit button
    });

    test('shows snackbar when fields are empty', async () => {
        renderPostCreation(); // Render the PostCreation component

        userEvent.click(screen.getByRole('button', { name: /Submit/i })); // Submit with empty fields

        await waitFor(() => {
            expect(screen.getByText(/Title and Content cannot be empty!/i)).toBeInTheDocument(); // Check snackbar for empty fields
        });
    });

    test('clears the form after successful submission', async () => {
        axios.post.mockResolvedValueOnce({ data: { message: 'Post created successfully!' } });

        renderPostCreation(); // Render the PostCreation component

        userEvent.type(screen.getByLabelText(/Title/i), 'Test Post Title'); // Type title
        userEvent.type(screen.getByLabelText(/Content/i), 'This is a test post content.'); // Type content
        userEvent.click(screen.getByRole('button', { name: /Submit/i })); // Submit form

        await waitFor(() => {
            expect(screen.getByLabelText(/Title/i).value).toBe(''); // Verify title field is cleared
            expect(screen.getByLabelText(/Content/i).value).toBe(''); // Verify content field is cleared
        });
    });
});
