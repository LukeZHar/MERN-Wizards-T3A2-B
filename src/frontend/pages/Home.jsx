import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import brandLogo from "../assets/ProductIcon.png"

const Home = () => {
    const navigate = useNavigate(); // Use the navigate hook from react-router-dom

    const handleRegister = () => {
        navigate('/register'); // Redirect to the registraion page
    };

    return (
        <Container component="main" maxWidth="sm" sx={{ marginTop: '100px', textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>
                Welcome to freindly and efficient task management
            </Typography>
            <img src={brandLogo} alt="Brand Logo" style={{ display: 'block', margin: '0 auto', width: '80%', maxWidth: '500px', borderRadius: '50%' }} />
            <Typography variant="body1" gutterBottom>
            Simplify your collaboration and workflow planning .
            </Typography>
            <Typography>
            Don't have an account?
            </Typography>
            <Button 
                variant="contained" 
                onClick={handleRegister} 
                sx={{ mt: 2, bgcolor: '#00cccc', color: '#fffff0'}}
            >
                Register for access
            </Button>
        </Container>
    );
};

export default Home;