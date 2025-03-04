import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
    const navigate = useNavigate(); // Use the navigate hook from react-router-dom

    const handleGoHome = () => {
        navigate('/dashboard'); // Redirect to the Dash
    };

    return (
        <Container component="main" maxWidth="sm" sx={{ marginTop: '100px', textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>
                404 - Page Not Found
            </Typography>
            <Typography variant="body1" gutterBottom>
                Sorry, the page you are looking for does not exist.
            </Typography>
            <Button 
                variant="contained" 
                onClick={handleGoHome} 
                sx={{ mt: 2, bgcolor: '#00cccc', color: '#fffff0'}}
            >
                Go to Dashboard
            </Button>
        </Container>
    );
};

export default NotFoundPage;