import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import logo from "../assets/Mern.png";
import { useSnackbar } from "../contexts/SnackbarContext";
import { Navigate, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth"
import LoginPrompt from "../components/LoginPrompt";

export default function ProfilePage() {
    const [user, setUser] = useState({
        username: "",
        email: "",
        registrationDate: "",
    });

    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const showSnackbar = useSnackbar();

    // Redirects user to login page if not logged in
    if (!isLoggedIn()) {
        return <LoginPrompt message="You must be logged in to view your profile." />;
    }

    // Fetch user data
    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token'); // Retrieve the token
            if (token) {
                const decodedToken = jwtDecode(token);
                const userId = decodedToken.userId; // Ensure 'userId' is included in your JWT payload

                try {
                    const response = await axios.get(
                        `${import.meta.env.VITE_AUTH_API_URL}/api/users/${userId}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`, // Include JWT token
                            },
                        }
                    );
                    setUser(response.data);
                } catch (err) {
                    console.error("Error fetching user data:", err);
                    showSnackbar(err.response?.data?.message || 'Update failed');
                }
            }
        };
        fetchUserData();
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    // Function to handle update user details form
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        
        if (token) { // Conditional check for Token
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.userId;
            const apiUrl = `${import.meta.env.VITE_AUTH_API_URL}/api/users/${userId}`;
    
            console.log("Sending PATCH request to:", apiUrl); // debug code
            console.log("Payload:", user);
            
            // Update user info
            try {
                await axios.patch(apiUrl, user, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                });
                showSnackbar("Details updated successfully!");
                console.log("Profile updated successfully!");
                navigate("/dashboard");
            } catch (err) {
                showSnackbar(err.response?.data?.message || 'Update failed');
            }
        }
    };

    const handleClear = () => {
        setUser(prevUser => ({
            username: "",
            email: "",
            registrationDate: prevUser.registrationDate
        }));
        showSnackbar("Form cleared!");
    };

    return (
        <Container component="main" maxWidth="sm">
            <Box sx={{
                bgcolor: '#00cccc',
                borderRadius: 2,
                padding: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '100px',
            }}>
                <img src={logo} alt="Logo" style={{ display: 'block', margin: '0 auto', width: '20%', maxWidth: '200px', borderRadius: '50%' }} />
                <Typography variant="h5">
                    User Profile
                </Typography>

                <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                    <TextField
                        fullWidth
                        label="Username"
                        name="username"
                        variant="outlined"
                        value={user.username}
                        onChange={handleChange}
                        sx={{ marginBottom: 2, backgroundColor: "#fffff0" }}
                    />

                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        variant="outlined"
                        value={user.email}
                        onChange={handleChange}
                        sx={{ marginBottom: 2, backgroundColor: "#fffff0" }}
                    />

                    <TextField
                        fullWidth
                        label="Registration Date"
                        name="registrationDate"
                        variant="outlined"
                        value={new Date(user.registrationDate).toLocaleDateString()}
                        disabled
                        sx={{ marginBottom: 2, backgroundColor: "#fffff0" }}
                    />

                    <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
                        <Button variant="contained" color="secondary" onClick={handleClear}>
                            Clear
                        </Button>
                        <Button variant="contained" color="primary" type="submit">
                            Update Profile
                        </Button>
                    </Box>
                </form>
            </Box>
        </Container>
    );
}