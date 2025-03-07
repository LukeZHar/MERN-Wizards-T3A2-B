import React from 'react';
import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from '../../frontend/components/Footer'; 
import { MemoryRouter } from 'react-router-dom';

// Mock icons
vi.mock('@mui/icons-material', () => ({
    Facebook: () => <div>Facebook Icon</div>,
    Twitter: () => <div>Twitter Icon</div>,
    Instagram: () => <div>Instagram Icon</div>,
}));

// Mock image assets
vi.mock('../../frontend/assets/Mern.png', () => 'mocked-image-url');

test.skip('renders Footer with quick links', () => {
    render(<Footer />); // Render the Footer component

    // Check that all quick links are rendered
    expect(screen.getByRole('link', { name: /About Us/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Contact/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Privacy Policy/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Terms of Service/i })).toBeInTheDocument();
});

test.skip('renders Footer with social media links', () => {
    render(<Footer />); // Render the Footer component

    // Check that social media links are rendered
    expect(screen.getByRole('link', { name: /Facebook/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Twitter/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Instagram/i })).toBeInTheDocument();
});

test.skip('renders Footer copyright text', () => {
    render(<Footer />); // Render the Footer component

    // Check copyright text
    const copyrightText = screen.getByText(/© \d{4} A Ticket a Task It. All rights reserved/i);
    expect(copyrightText).toBeInTheDocument(); // Check that copyright text is present
});
