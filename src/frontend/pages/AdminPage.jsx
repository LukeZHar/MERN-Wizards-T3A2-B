import React, { useState, useEffect } from "react";
import { TextField, Button, InputAdornment, Typography, Container, Box, Avatar, IconButton, Divider } from "@mui/material";
import { Search, Edit, Delete, Visibility } from "@mui/icons-material";
import axios from "axios";
import { useSnackbar } from "../contexts/SnackbarContext";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import LoginPrompt from "../components/LoginPrompt";

export default function () {

    return(
        <Container component="main" maxWidth="sm">
        {/* Page Header */}
        <Typography 
            variant="h4" 
            align="center" 
            sx={{ marginBottom: 4, fontWeight: 'bold', color: '#333', fontSize: { xs: '1.8rem', sm: '2.2rem' } }}
        >
            Admin Panel
        </Typography>

        {/* Search Posts Section */}
        <Box sx={{
            bgcolor: '#00cccc',
            borderRadius: 2,
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '100px',
            boxShadow: 3, 
        }}>
            <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 'bold', color: 'white' }}>
                Search Posts
            </Typography>
            <TextField 
                fullWidth 
                placeholder="Search posts..." 
                variant="outlined" 
                sx={{ bgcolor: 'white', borderRadius: 1, marginBottom: 2 }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search color="primary" />
                        </InputAdornment>
                    ),
                }}
            />
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
                <Button variant="contained" startIcon={<Visibility />} color="primary">View</Button>
                <Button variant="contained" startIcon={<Edit />} color="warning">Edit</Button>
                <Button variant="contained" startIcon={<Delete />} color="error">Delete</Button>
            </Box>
        </Box>

        {/* Search Users Section */}
        <Box sx={{
            bgcolor: '#00cccc',
            borderRadius: 2,
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '20px',
            boxShadow: 3, // Keeping consistency
        }}>
            <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 'bold', color: 'white' }}>
                Search Users
            </Typography>
            <TextField 
                fullWidth 
                placeholder="Search users..." 
                variant="outlined" 
                sx={{ bgcolor: 'white', borderRadius: 1, marginBottom: 2 }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search color="primary" />
                        </InputAdornment>
                    ),
                }}
            />
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
                <Button variant="contained" startIcon={<Visibility />} color="primary">View</Button>
                <Button variant="contained" startIcon={<Edit />} color="warning">Edit</Button>
                <Button variant="contained" startIcon={<Delete />} color="error">Delete</Button>
            </Box>
        </Box>
    </Container>
)}