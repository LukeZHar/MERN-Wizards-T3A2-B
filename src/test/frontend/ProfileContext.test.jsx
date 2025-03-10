import React from 'react';
import { expect, test, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { ProfileProvider, useProfile } from '../../frontend/contexts/ProfileContext'; // Adjust path as necessary

// Mock function to simulate localStorage
const mockLocalStorage = () => {
    let store = {};
    Object.defineProperty(window, 'localStorage', {
        value: {
            getItem: (key) => store[key] || null,
            setItem: (key, value) => {
                store[key] = value;
            },
            removeItem: (key) => {
                delete store[key];
            },
            clear: () => {
                store = {};
            },
        },
        writable: true,
    });
};

const TestComponent = () => {
    const { profileImage, updateProfileImage } = useProfile();

    return (
        <div>
            <button onClick={() => updateProfileImage('new-image-url')}>Update Image</button>
            <div data-testid="profile-image">{profileImage || 'No Image'}</div> {/* Default display */}
        </div>
    );
};

const renderWithProviders = () => {
    return render(
        <ProfileProvider>
            <TestComponent />
        </ProfileProvider>
    );
};

describe('ProfileContext Tests', () => {
    beforeEach(() => {
        // Clear local storage before each test
        mockLocalStorage(); // Set up mocking for localStorage
    });

    test('initial profile image state is null', () => {
        renderWithProviders();

        // Check if the initial state of profileImage is displayed as 'No Image'
        expect(screen.getByTestId('profile-image').textContent).toBe('No Image');
    });

    test('sets profile image and updates local storage', async () => {
        renderWithProviders();

        // Click the button to update the profile image
        await userEvent.click(screen.getByRole('button', { name: /Update Image/i }));

        // Check if the profile image is updated in the component
        expect(screen.getByTestId('profile-image').textContent).toBe('new-image-url');

        // Verify profile image in localStorage
        expect(localStorage.getItem('profileImage')).toBe('new-image-url');
    });

    test('updates profile image and verifies state and local storage', async () => {
        renderWithProviders();

        // Click the button to update the profile image
        await userEvent.click(screen.getByRole('button', { name: /Update Image/i }));

        // Check if the profile image is updated in the component
        expect(screen.getByTestId('profile-image').textContent).toBe('new-image-url');

        // Verify profile image in localStorage
        expect(localStorage.getItem('profileImage')).toBe('new-image-url');

        // Update the profile image again
        await userEvent.click(screen.getByRole('button', { name: /Update Image/i }));

        // Check if the profile image is still updated in the component
        expect(screen.getByTestId('profile-image').textContent).toBe('new-image-url');

        // Verify profile image in localStorage
        expect(localStorage.getItem('profileImage')).toBe('new-image-url');
    });
});