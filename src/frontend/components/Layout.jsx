import React from 'react';
import { Stack } from '@mui/material'; // Import Stack component
import Header from './Header';
import Footer from './Footer';
import ScrollTop from './ScrollTop'; // Import ScrollTop component

const Layout = ({ children }) => {
    return (
        <Stack sx={{ minHeight: '100vh' }} spacing={0}>
            <Header />
            <Stack sx={{ flex: 1 }}>
                <main style={{ padding: '20px' }}>
                    {children}
                </main>
            </Stack>
            <ScrollTop />
            <Stack justifyContent="flex-end">
                <Footer />
            </Stack>
        </Stack>
    );
};

export default Layout;