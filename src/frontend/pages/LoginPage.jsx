import { useState } from "react";
import axios from 'axios';
import { TextField, Button, Typography, Container, Divider, InputAdornment } from '@mui/material'; // Import MUI components
import { AccountCircle, Lock } from '@mui/icons-material';
import { useUserAuthContext } from "../contexts/UserAuthContext"; // Import custom AuthContext
import { useSnackbar } from "../contexts/SnackbarContext";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Mern.png";
import { motion } from "framer-motion";

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
        <Container
            component="main"
            maxWidth="xs"
            sx={{
                bgcolor: '#00cccc', // Background color of the container
                borderRadius: 2,
                padding: { xs: 3, sm: 4 }, // Adjust padding based on screen size
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: "auto"
            }}
        >
            {/* Logo with Responsive Sizing */}
            <img
                src={logo}
                alt="Logo"
                style={{
                    display: 'block',
                    margin: '0 auto',
                    width: "30%", // Slightly larger on small screens
                    maxWidth: '180px',
                    borderRadius: '50%'
                }}
            />

            {/* Welcome Message */}
            <Typography
                variant="h5"
                component="h2"
                align="center"
                sx={{ fontSize: { xs: "1.4rem", sm: "1.6rem" }, fontWeight: "bold", mt: 2 }}
            >
                Welcome
            </Typography>

            <Typography
                variant="body1"
                align="center"
                gutterBottom
                sx={{ fontSize: { xs: "0.9rem", sm: "1rem" }, mb: 3 }}
            >
                Please enter your details to continue
            </Typography>

            {/* Login Form */}
            <form onSubmit={handleSubmit} noValidate style={{ width: '100%' }}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Username"
                    inputProps={{ 'data-testid': 'login-username-input' }}
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
                    inputProps={{ 'data-testid': 'login-password-input' }}
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

                {/* Login Button with Hover Effect */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                >
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 3,
                            py: 1.2,
                            fontSize: "1rem",
                            bgcolor: "#fffff0"
                        }}
                    >
                        Login
                    </Button>
                </motion.div>

                {/* Divider with OR */}
                <Divider sx={{ my: 3 }}>
                    <Typography variant="body2">OR</Typography>
                </Divider>

                {/* Register Link */}
                <Typography
                    variant="body2"
                    align="center"
                    sx={{ mt: 2, fontSize: "0.9rem" }}
                >
                    Don't have an account? <a href="/register" style={{ color: '#fffff0', fontWeight: "bold" }}>Register</a>
                </Typography>

                {/* Error Alert */}
                {error && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                        <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>
                    </motion.div>
                )}
            </form>
        </Container>
    );
}    