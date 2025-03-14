import React, { useState } from "react";
import { TextField, Button, Typography, Container, Select, MenuItem, Box } from "@mui/material";
import axios from "axios";
import { useSnackbar } from "../contexts/SnackbarContext";
import { Navigate, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth"
import LoginPrompt from "../components/LoginPrompt";
import { motion } from "framer-motion";

export default function PostCreation() {
    // State for form inputs
    const [post, setPost] = useState({
        title: "",
        content: "",
        priority: "Low",
        category: "Web Team"
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
            category: "Web Team"
        });

        console.log("Form has been cleared!");
    };

    return (
        // Page styling
        <Container component="main" maxWidth="sm">
            <Box sx={{
                bgcolor: '#00cccc', // Background color of the container
                borderRadius: 2,
                padding: { xs: 3, sm: 4 }, // Adjust padding based on screen size
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: { xs: '60px', sm: '100px' }, // Adjust margin for better responsiveness
            }}>

                <Typography
                    variant="h5"
                    sx={{
                        letterSpacing: "1px",
                        padding: "12px",
                        margin: "16px 0",
                        textAlign: "center",
                        fontSize: { xs: "1.2rem", sm: "1.5rem" }
                    }}
                >
                    Create a New Post
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
                        sx={{ marginBottom: 2 }}
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
                        sx={{ marginBottom: 2 }}
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
                        <MenuItem value="Web Team">Web Team</MenuItem>
                        <MenuItem value="Data Team">Data Team</MenuItem>
                        <MenuItem value="IT Team">IT Team</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                    </Select>

                    {/* Buttons */}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            flexDirection: { xs: "column", sm: "row" }, // Stack buttons on small screens
                            gap: { xs: 2, sm: 0 },
                            marginTop: 2
                        }}
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleClear}
                                sx={{ width: { xs: "100%", sm: "auto" } }} // Full width on mobile
                            >
                                Clear
                            </Button>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                sx={{ width: { xs: "100%", sm: "auto" } }}
                            >
                                Submit
                            </Button>
                        </motion.div>
                    </Box>
                </form>
            </Box>
        </Container>
    );
}  