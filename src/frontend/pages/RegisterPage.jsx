import { useState } from "react";
import axios from 'axios';
import logo from "../assets/Mern.png";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Container, Alert, Divider, InputAdornment } from '@mui/material'; // Import MUI components
import { AccountCircle, Lock, MailOutline } from '@mui/icons-material';
import { useSnackbar } from "../contexts/SnackbarContext";
import { motion } from "framer-motion";

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const showSnackbar = useSnackbar(); // Access Snackbar hook
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check for missing fields
        if (!username || !email || !password) {
            showSnackbar('All fields are required', 'warning');
            return;
        }

        // Password validation
        if (password.length < 6) {
            showSnackbar("Password must be at least 6 characters long.", "warning");
            return;
        }

        const passwordCondition = /^(?=.*[A-Z])(?=.*\d)/; // At least one uppercase letter and one number
        if (!passwordCondition.test(password)) {
            showSnackbar("Password must include at least one uppercase letter and one number.", "warning");
            return;
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_AUTH_API_URL}/api/auth/register`, { username, email, password });
            showSnackbar(response.data.message);
            navigate('/login');
        } catch (err) {
            showSnackbar(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <Container
            component="main"
            maxWidth="xs"
            sx={{
                bgcolor: '#00cccc', // Background color
                borderRadius: 2,
                padding: { xs: 3, sm: 4 }, // Adjust padding dynamically
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
                    width: "30%", // Adjusted for better responsiveness
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

            {/* Registration Form */}
            <form onSubmit={handleSubmit} noValidate style={{ width: '100%' }}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Username"
                    inputProps={{ 'data-testid': 'username-input' }}
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
                    label="Email"
                    type="email"
                    inputProps={{ 'data-testid': 'email-input' }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <MailOutline /> {/* Email icon */}
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
                    inputProps={{ 'data-testid': 'password-input' }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Lock /> {/* Lock icon */}
                            </InputAdornment>
                        ),
                    }}
                />

                {/* Register Button with Hover Effect */}
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
                        Register
                    </Button>
                </motion.div>

                {/* Divider with OR */}
                <Divider sx={{ my: 3 }}>
                    <Typography variant="body2">OR</Typography>
                </Divider>

                {/* Error Alert */}
                {error && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                        <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>
                    </motion.div>
                )}

                {/* Login Link */}
                <Typography
                    variant="body2"
                    align="center"
                    sx={{ mt: 2, fontSize: "0.9rem", color: "#fffff0" }}
                >
                    Already have an account? <a href="/login" style={{ color: '#fffff0', fontWeight: "bold" }}>Login</a>
                </Typography>
            </form>
        </Container>
    );
}    