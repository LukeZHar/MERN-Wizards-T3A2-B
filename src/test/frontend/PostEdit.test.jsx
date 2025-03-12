import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, vi, test, beforeEach } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom'; // Import necessary routing
import PostEdit from '../../frontend/pages/PostEdit'; // Adjust path as necessary

// - Render Content and check if rendered conent is correct

test("Render the App component", () => {
    render(<PostEdit />);

    const postDetails= screen.getByText(/edit-post/i);
    expect(postDetails).toBeInTheDocument();
})