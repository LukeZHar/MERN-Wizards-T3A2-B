import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, vi, test, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import ProfilePage from '../../frontend/pages/ProfilePage'; // Adjust path as necessary
import { SnackbarProvider } from '../../frontend/contexts/SnackbarContext';
import { UserAuthContextProvider } from '../../frontend/contexts/UserAuthContext'; // Import UserAuthContextProvider
import { ProfileProvider } from '../../frontend/contexts/ProfileContext'; // Import ProfileProvider
import axios from 'axios'; // Mocking axios

// Mocking the axios module
vi.mock('axios');

// Mock MUI Icons to prevent loading actual icons
vi.mock('@mui/icons-material', () => ({
    AccountCircle: (props) => <div {...props}>AccountCircle</div>,
    Lock: (props) => <div {...props}>Lock</div>,
    MailOutline: (props) => <div {...props}>MailOutline</div>,
    PhotoCamera: (props) => <div {...props}>PhotoCamera</div>,
}));

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

// Function to render ProfilePage
const renderProfilePage = (mockedAuthValue) => { 
    return render(
        <UserAuthContextProvider value={mockedAuthValue}>
            <SnackbarProvider>
                <ProfileProvider value={{ profileImage: 'sample-image.png', setProfileImage: vi.fn() }}>
                    <MemoryRouter>
                        <ProfilePage />
                    </MemoryRouter>
                </ProfileProvider>
            </SnackbarProvider>
        </UserAuthContextProvider>
    );
};

describe('ProfilePage Tests', () => {
    beforeEach(() => {
        vi.clearAllMocks(); // Clear previous mocks before each test
    });

    test('renders the profile page header correctly', () => {
        mockLocalStorage('mockUserId'); // Simulate a logged-in state using localStorage
        const mockedValue = ['token123', () => {}, () => {}]; // Simulated authenticated user
        renderProfilePage(mockedValue); // Render ProfilePage

        expect(screen.getByText(/Your Profile/i)).toBeInTheDocument(); // Check that the profile header is visible
    });

    test('fetches and displays user data correctly', async () => {
        const userData = { username: 'JohnDoe', email: 'john@example.com', registrationDate: new Date().toISOString(), userClass: 'User' };
        axios.get.mockResolvedValueOnce({ data: userData });

        mockLocalStorage('mockUserId'); // Simulate a logged-in state
        const mockedValue = ['token123', () => {}, () => {}]; // Simulated authenticated user
        renderProfilePage(mockedValue); // Render ProfilePage

        await waitFor(() => {
            expect(screen.getByDisplayValue(userData.username)).toBeInTheDocument(); // Username should be displayed
            expect(screen.getByDisplayValue(userData.email)).toBeInTheDocument(); // Email should be displayed
        });
    });

    test('shows login prompt if not logged in', () => {
        mockLocalStorage(''); // Simulate a logged-out state
        const mockedValue = [null, () => {}, () => {}]; // Simulated unauthenticated user

        renderProfilePage(mockedValue); // Render ProfilePage

        expect(screen.getByText(/You must be logged in to view your profile/i)).toBeInTheDocument(); // Check for login prompt
    });

    test('updates profile details correctly', async () => {
        axios.get.mockResolvedValueOnce({ data: { username: 'JohnDoe', email: 'john@example.com' } });
        axios.patch.mockResolvedValueOnce({}); // Assume a successful update

        mockLocalStorage('mockUserId'); // Simulate a logged-in state using localStorage
        const mockedValue = ['token123', () => {}, () => {}]; // Simulated authenticated user
        renderProfilePage(mockedValue); // Render ProfilePage

        userEvent.type(screen.getByLabelText(/Username/i), 'JaneDoe'); // Type in a new username
                userEvent.click(screen.getByRole('button', { name: /Update Profile/i })); // Click the update profile button

        await waitFor(() => {
            expect(screen.getByText("Details updated successfully!")).toBeInTheDocument(); // Check success message
        });
    });

    test('removes profile photo when button is clicked', async () => {
        renderProfilePage();

        userEvent.click(screen.getByRole('button', { name: /Remove Photo/i }));

        expect(screen.queryByText(/Profile photo removed/i)).not.toBeInTheDocument(); // Ensure profile photo message is not found anymore
    });
});

       
