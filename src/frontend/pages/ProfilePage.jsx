import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Container, Select, MenuItem, Box } from "@mui/material";
import axios from "axios";

export default function ProfilePage() {
    const [user, setUser] = useState({ username: "", email: "", name: "", registrationDate: "" });
    const [updatedUser, setUpdatedUser] = useState({ username: "", email: "", name: "" });
    const [passwordData, setPasswordData] = useState({ currentPassword: "", newPassword: "" });


    return(
        <Container component="main" maxWidth="sm">
            <Box sx={{
                bgcolor: '#00cccc', // Background color
                borderRadius: 2,
                padding: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '100px', // Centered with margin above
            }}></Box>
        </Container>
    )
}

