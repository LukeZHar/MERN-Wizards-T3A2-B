import { useState } from "react";
import axios from 'axios';
import logo from "../assets/Mern.png"
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Container, Alert, Divider, InputAdornment } from '@mui/material'; // Import MUI components
import { AccountCircle, Lock, MailOutline } from '@mui/icons-material';
import GoogleIcon from '@mui/icons-material/Google';
import { useSnackbar } from "../contexts/SnackbarContext";

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const showSnackbar = useSnackbar(); // Access Snackbar hook
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_AUTH_API_URL}/api/auth/register`, { username, email, password });
            showSnackbar(response.data.message);
            navigate('/login');
        } catch (err) {
            showSnackbar(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <Container component="main" maxWidth="xs" sx={{
            bgcolor: '#00cccc', // Background color
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
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2 }}
                >
                    Register
                </Button>
                <Divider sx={{ my: 2 }}>
                    <Typography variant="body2">OR</Typography>
                </Divider>
                <Button
                    fullWidth
                    variant="contained"
                    sx={{ mb: 2, mt: 1 }}
                    onClick={() => window.location.href = 'http://localhost:5000/api/auth/google'}
                >
                    <GoogleIcon sx={{ marginRight: 1 }} /> {/* Google icon */}
                    Register with Google
                </Button>
                {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>} 
                <Typography variant="body2" color="#fffff0" align="center" sx={{ mt: 2 }}>
                    Already have an account? <a href="/login" style={{ color: '#fffff0' }}>Login</a>
                </Typography>
            </form>
        </Container>
    );
}