import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import axios from "axios";
import logo from "../assets/Mern.png";
import { useSnackbar } from "../contexts/SnackbarContext";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import LoginPrompt from "../components/LoginPrompt";

export default function ProfilePage() {
    const [user, setUser] = useState({
        username: "",
        email: "",
        registrationDate: "",
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: ""
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
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await axios.get(
                        `${import.meta.env.VITE_AUTH_API_URL}/api/users/profile`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    setUser(response.data);
                } catch (err) {
                    console.error("Error fetching user data:", err);
                    showSnackbar(err.response?.data?.message || 'Failed to fetch user data');
                }
            }
        };
        fetchUserData();
    }, []);

    // Handle input changes for user profile
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    // Handle input changes for password fields
    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData({ ...passwordData, [name]: value });
    };

    // Function to handle updating user details
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        if (token) {
            try {
                await axios.patch(
                    `${import.meta.env.VITE_AUTH_API_URL}/api/users/update-profile`,
                    user,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json"
                        },
                    }
                );
                showSnackbar("Details updated successfully!");
                navigate("/dashboard");
            } catch (err) {
                showSnackbar(err.response?.data?.message || 'Update failed');
            }
        }
    };

    // Function to handle password update
    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        if (!token) {
            showSnackbar("Authentication error. Please log in again.");
            return;
        }

        // Ensure new password matches confirmation
        if (passwordData.newPassword !== passwordData.confirmNewPassword) {
            showSnackbar("New passwords do not match!");
            return;
        }

        try {
            const response = await axios.patch(
                `${import.meta.env.VITE_AUTH_API_URL}/api/users/update-password`,
                {
                    currentPassword: passwordData.currentPassword,
                    newPassword: passwordData.newPassword
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                }
            );

            showSnackbar(response.data.message);
            setPasswordData({ currentPassword: "", newPassword: "", confirmNewPassword: "" });
        } catch (err) {
            showSnackbar(err.response?.data?.message || 'Failed to update password');
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

                {/* Profile Update Form */}
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

                {/* Password Update Form */}
                <Typography variant="h5" sx={{ marginTop: 4 }}>
                    Change Password
                </Typography>
                <form onSubmit={handlePasswordUpdate} style={{ width: "100%" }}>
                    <TextField
                        fullWidth
                        label="Current Password"
                        name="currentPassword"
                        type="password"
                        variant="outlined"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        sx={{ marginBottom: 2, backgroundColor: "#fffff0" }}
                        required
                    />

                    <TextField
                        fullWidth
                        label="New Password"
                        name="newPassword"
                        type="password"
                        variant="outlined"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        sx={{ marginBottom: 2, backgroundColor: "#fffff0" }}
                        required
                    />

                    <TextField
                        fullWidth
                        label="Confirm New Password"
                        name="confirmNewPassword"
                        type="password"
                        variant="outlined"
                        value={passwordData.confirmNewPassword}
                        onChange={handlePasswordChange}
                        sx={{ marginBottom: 2, backgroundColor: "#fffff0" }}
                        required
                    />

                    <Button variant="contained" color="primary" type="submit" sx={{ marginTop: 2 }}>
                        Update Password
                    </Button>
                </form>
            </Box>
        </Container>
    );
}
