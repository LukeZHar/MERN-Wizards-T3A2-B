import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Container, Select, MenuItem, Box } from "@mui/material";
import axios from "axios";
import logo from "../assets/Mern.png"

export default function ProfilePage() {
    const [user, setUser] = useState({ username: "", email: "", name: "", registrationDate: "" });
    const [updatedUser, setUpdatedUser] = useState({ username: "", email: "", name: "" });
    const [passwordData, setPasswordData] = useState({ currentPassword: "", newPassword: "" });


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

                <form style={{ width: "100%" }}>
                    <TextField
                        fullWidth
                        label="Username"
                        name="username"
                        variant="outlined"
                        sx={{ marginBottom: 2, backgroundColor: "#fffff0" }}
                    />

                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        variant="outlined"
                        sx={{ marginBottom: 2, backgroundColor: "#fffff0" }}
                    />

                    <TextField
                        fullWidth
                        label="Name"
                        name="name"
                        variant="outlined"
                        sx={{ marginBottom: 2, backgroundColor: "#fffff0" }}
                    />

                    <TextField
                        fullWidth
                        label="Registration Date"
                        name="registrationDate"
                        variant="outlined"
                        disabled
                        sx={{ marginBottom: 2, backgroundColor: "#fffff0" }}
                    />

                    <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        type="password"
                        variant="outlined"
                        sx={{ marginBottom: 2, backgroundColor: "#fffff0" }}
                    />

                    <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
                        <Button variant="contained" color="secondary" >
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

