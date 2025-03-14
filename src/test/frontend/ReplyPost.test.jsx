import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, beforeEach, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import ReplyPost from '../../frontend/pages/ReplyPost';
import { SnackbarProvider } from '../../frontend/contexts/SnackbarContext';
import { UserAuthContextProvider } from '../../frontend/contexts/UserAuthContext';
import axios from 'axios';

// Mock axios
vi.mock('axios');

const mockLocalStorage = (mockUserId) => {
    Object.defineProperty(window, 'localStorage', {
        value: {
            getItem: () => mockUserId,
            setItem: () => { },
            removeItem: () => { },
        },
        writable: true,
    });
};

const renderReplyPost = (postId) => {
    render(
        <UserAuthContextProvider value={['token123', vi.fn()]}>
            <SnackbarProvider>
                <MemoryRouter initialEntries={[`/reply/${postId}`]}>
                    <ReplyPost />
                </MemoryRouter>
            </SnackbarProvider>
        </UserAuthContextProvider>
    );
};

// Mock post data
const mockPostData = {
    _id: '1',
    title: 'Test Post Title',
    content: 'This is a test post content.',
    createdAt: '2023-08-01T12:00:00Z',
    priority: 'High',
    category: 'Option 1',
};

describe('ReplyPost Component Tests', () => {
    beforeEach(() => {
        vi.clearAllMocks(); // Clear mocks before each test
        mockLocalStorage('mockUserId'); // Simulate a logged-in state

        axios.get.mockResolvedValueOnce({ data: mockPostData }); // Mock API call to fetch post details
    });

    test('renders ReplyPost component with post details', async () => {
        renderReplyPost(mockPostData._id);

        // Check post details displayed
        expect(await screen.findByText(mockPostData.title)).toBeInTheDocument();
        expect(screen.getByText(mockPostData.content)).toBeInTheDocument();
        expect(screen.getByText(/Published:/i)).toBeInTheDocument();
        expect(screen.getByText(/Priority:/i)).toBeInTheDocument();
        expect(screen.getByText(/Category:/i)).toBeInTheDocument();
    });
});
