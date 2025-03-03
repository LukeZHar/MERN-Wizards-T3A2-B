import React from 'react';
import { Container, Typography, Link, Grid2 } from '@mui/material';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';

export default function Footer() {
    return (
        <footer style={{ width: '100%', position: 'relative', margin: 0}}>
            <Container maxWidth="false" sx={{ padding: '8px', bgcolor: '#00cccc', color: '#fffff0', margin: 0 }}>
                <Grid2 container spacing={2}>
                    <Grid2 xs={12} sm={6}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Quick Links</Typography>
                        <Link href="/about" color="#fffff0" sx={{ display: 'block', marginBottom: 1, '&:hover': { color: '#cccccc' } }}>About Us</Link>
                        <Link href="/contact" color="#fffff0" sx={{ display: 'block', marginBottom: 1, '&:hover': { color: '#cccccc' } }}>Contact</Link>
                        <Link href="/privacy" color="#fffff0" sx={{ display: 'block', marginBottom: 1, '&:hover': { color: '#cccccc' } }}>Privacy Policy</Link>
                        <Link href="/terms" color="#fffff0" sx={{ display: 'block', marginBottom: 1, '&:hover': { color: '#cccccc' } }}>Terms of Service</Link>
                    </Grid2>
                    <Grid2 xs={12} sm={6}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Follow Us</Typography>
                        <Link href="https://facebook.com" target="_blank" color="#fffff0" sx={{ display: 'flex', alignItems: 'center', marginBottom: 1, '&:hover': { color: '#cccccc' } }}>
                            <Facebook sx={{ marginRight: 1 }} /> Facebook
                        </Link>
                        <Link href="https://twitter.com" target="_blank" color="#fffff0" sx={{ display: 'flex', alignItems: 'center', marginBottom: 1, '&:hover': { color: '#cccccc' } }}>
                            <Twitter sx={{ marginRight: 1 }} /> Twitter
                        </Link>
                        <Link href="https://instagram.com" target="_blank" color="#fffff0" sx={{ display: 'flex', alignItems: 'center', marginBottom: 1, '&:hover': { color: '#cccccc' } }}>
                            <Instagram sx={{ marginRight: 1 }} /> Instagram
                        </Link>
                    </Grid2>
                </Grid2>
                <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
                    &copy; {new Date().getFullYear()} A Ticket a Task It. All rights reserved.
                </Typography>
            </Container>
        </footer>
    );
}