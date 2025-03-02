import React from 'react';
import { Container, Typography } from '@mui/material';

export default function Footer() {
    return (
        <footer>
            <Container maxWidth="lg" sx={{ padding: '16px', bgcolor: '#00cccc', color: '#fffff0' }}>
                <Typography variant="body2" align="center">
                    &copy; {new Date().getFullYear()} A Ticket a Task It. All rights reserved.
                </Typography>
            </Container>
        </footer>
    );
};