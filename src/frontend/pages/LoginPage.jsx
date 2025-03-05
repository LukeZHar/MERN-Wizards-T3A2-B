import { useState } from "react";
import axios from 'axios';
import { TextField, Button, Typography, Container, Divider, InputAdornment } from '@mui/material'; // Import MUI components
import { AccountCircle, Lock } from '@mui/icons-material';
import { useUserAuthContext } from "../contexts/UserAuthContext"; // Import custom AuthContext
import { useSnackbar } from "../contexts/SnackbarContext";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Mern.png"

export default function LoginPage() {
    // State variables for storing login input and error messages
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [token, setToken] = useUserAuthContext(); // Access token state from context
    const showSnackbar = useSnackbar(); // Access Snackbar
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        try {
            // Send login request to the backend API
            const response = await axios.post(`${import.meta.env.VITE_AUTH_API_URL}/api/auth/login`, { username, password });
            localStorage.setItem('token', response.data.token); // Store JWT token in localStorage 
            setToken(response.data.token); // Set the token in context
            showSnackbar('Login successful!'); // Show message on successful login
            navigate('/dashboard');
        } catch (err) {
            // Set error message to display if login fails
            showSnackbar(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <Container component="main" maxWidth="xs" sx={{
            bgcolor: '#00cccc', // Background color of the container
            borderRadius: 2,
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '100px', // Centered with margin above
        }}>
            <img src={logo} alt="Logo" style={{ display: 'block', margin: '0 auto', width: '20%', maxWidth: '200px', borderRadius: '50%' }} />
            <Typography variant="h5" component="h2" align="center">
                Welcome
            </Typography>
            <Typography variant="body1" align="center" gutterBottom>
                Please enter your details to continue
            </Typography>
            <form onSubmit={handleSubmit} noValidate style={{ width: '100%' }}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Username"
                    autoFocus
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircle />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Lock />
                            </InputAdornment>
                        ),
                    }}
                />
                <Button 
                    type="submit" 
                    fullWidth 
                    variant="contained" 
                    sx={{ mt: 2 }}
                >
                    Login
                </Button>
                <Divider sx={{ my: 2 }}>
                    <Typography variant="body2">OR</Typography>
                </Divider>
                <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                    Don't have an account? <a href="/register" style={{ color: '#fffff0' }}>Register</a>
                </Typography>
                {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
            </form>
        </Container>
    );
}