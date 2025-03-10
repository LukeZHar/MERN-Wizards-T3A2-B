import React, { useState } from "react";
import logo from "../assets/Mern.png"
import { TextField, Button, Typography, Container, Select, MenuItem, Box } from "@mui/material";
import axios from "axios";
import { useSnackbar } from "../contexts/SnackbarContext";
import { Navigate, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth"
import LoginPrompt from "../components/LoginPrompt";

export default function PostCreation() {
    // State for form inputs
    const [post, setPost] = useState({
        title: "",
        content: "",
        priority: "Low",
        category: "Option 1"
    });

    const { isLoggedIn } = useAuth(); // Get auth status
    const navigate = useNavigate(); // Navigate to dashboard page 
    const showSnackbar = useSnackbar(); // Access Snackbar

    // Redirects user to login page if not logged in
    if (!isLoggedIn()) {
        return <LoginPrompt message="You must be logged in to view your profile." />;
    }

    // Function to handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPost((prev) => ({ ...prev, [name]: value }));
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!post.title.trim() || !post.content.trim()) {
            showSnackbar("Title and Content cannot be empty!");
            return;
        }

        try {
            const token = localStorage.getItem('token'); // Retrieve the token
            const response = await axios.post(
                `${import.meta.env.VITE_AUTH_API_URL}/api/posts`,
                post,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include JWT token
                    },
                }
            );

            console.log("Post created:", response.data);
            showSnackbar("Post created successfully!");
            handleClear();
            navigate("/dashboard");
        } catch (error) {
            console.error("Error creating post:", error.response?.data || error.message);
            showSnackbar(error.response?.data?.message || "Failed to create post");
        }
    };

    // Function to reset the form
    const handleClear = () => {
        setPost({
            title: "",
            content: "",
            priority: "Low",
            category: "Option 1"
        });

        console.log("Form has been cleared!");
    };

    return (
        // Page styling
        <Container component="main" maxWidth="sm">
            <Box sx={{
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
                <Typography variant="h5">
                    Post Creation
                </Typography>

                {/* Post creation form */}
                <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                    <TextField
                        fullWidth
                        label="Title"
                        name="title"
                        variant="outlined"
                        value={post.title}
                        onChange={handleChange}
                        sx={{ marginBottom: 2, backgroundColor: "#fffff0" }}
                    />

                    {/* Content */}
                    <TextField
                        fullWidth
                        label="Content"
                        name="content"
                        variant="outlined"
                        multiline
                        rows={4}
                        value={post.content}
                        onChange={handleChange}
                        sx={{ marginBottom: 2, backgroundColor: "#fffff0" }}
                    />

                    {/* Priority label */}
                    <Typography variant="body1">Priority:</Typography>
                    <Select
                        fullWidth
                        name="priority"
                        value={post.priority}
                        onChange={handleChange}
                        sx={{ marginBottom: 2, backgroundColor: "#fffff0" }}
                    >
                        <MenuItem value="Low">Low</MenuItem>
                        <MenuItem value="Medium">Medium</MenuItem>
                        <MenuItem value="High">High</MenuItem>
                    </Select>

                    {/* Category: */}
                    <Typography variant="body1">Category:</Typography>
                    <Select
                        fullWidth
                        name="category"
                        value={post.category}
                        onChange={handleChange}
                        sx={{ marginBottom: 2, backgroundColor: "#fffff0" }}
                    >
                        <MenuItem value="Option 1">Option 1</MenuItem>
                        <MenuItem value="Option 2">Option 2</MenuItem>
                        <MenuItem value="Option 3">Option 3</MenuItem>
                        <MenuItem value="Option 4">Option 4</MenuItem>
                    </Select>

                    {/* Buttons */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
                        <Button variant="contained" color="secondary" onClick={handleClear}>
                            Clear
                        </Button>
                        <Button variant="contained" color="primary" type="submit">
                            Submit
                        </Button>
                    </Box>
                </form>
            </Box>
        </Container>
    );
}
