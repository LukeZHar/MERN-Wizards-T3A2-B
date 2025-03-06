import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Container, Box, Avatar, IconButton, Divider } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import axios from "axios";
import logo from "../assets/Mern.png";
import { useSnackbar } from "../contexts/SnackbarContext";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import LoginPrompt from "../components/LoginPrompt";
import { useProfile } from "../contexts/ProfileContext";

export default function ProfilePage() {
    // Manages state for user details
    const [user, setUser] = useState({
        username: "",
        email: "",
        registrationDate: "",
    });

    // Manages state for user password
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: ""
    });

    const { profileImage, setProfileImage } = useProfile(); // Profile Avatar
    const { isLoggedIn } = useAuth(); // Auth Middleware
    const navigate = useNavigate(); // Navigate Hook
    const showSnackbar = useSnackbar(); // Snackbar for displaying msgs

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

    // Handle profile avatar change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader()
        reader.onloadend = () => {
            // Save photo
            setProfileImage(reader.result);
            localStorage.setItem("profileImage", reader.result);
        };
        reader.readAsDataURL(file);
    };

    // Removes profile avatar
    const handleRemoveImage = () => {
        setProfileImage(null);
        localStorage.removeItem("profileImage");
        showSnackbar("Profile photo removed!");
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

                {/* Profile Photo */}
                <Avatar
                    src={profileImage || "/default-avatar.png"}
                    alt="Profile"
                    sx={{
                        width: 140,
                        height: 140,
                        marginBottom: 2,
                        border: "4px solid #00cccc",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.4)",
                        cursor: "pointer "
                    }}
                />

                {/* Upload Profile Photo */}
                <input type="file" accept="image/*" id="upload-photo" style={{ display: "none" }} onChange={handleImageChange} />
                <label htmlFor="upload-photo">
                    <IconButton color="ivory" component="span">
                        <PhotoCamera />
                    </IconButton>
                </label>

                {/* Remove Profile Photo */}
                {profileImage && (
                    <Button variant="contained" color="fffff0" onClick={handleRemoveImage}>
                        Remove Photo
                    </Button>
                )}

                <Divider sx={{ width: "100%", my: 3, bgcolor: "#fffff0" }} />

                <Typography variant="h5" sx={{ marginBottom: 2 }}>
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
                        <Button variant="contained" color="primary" onClick={handleClear}>
                            Clear
                        </Button>
                        <Button variant="contained" color="primary" type="submit">
                            Update Profile
                        </Button>
                    </Box>
                </form>

                <Divider sx={{ width: "100%", my: 3, bgcolor: "#fffff0" }} />

                {/* Password Update Form */}
                <Typography variant="h5" sx={{ marginBottom: 2 }}>
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
