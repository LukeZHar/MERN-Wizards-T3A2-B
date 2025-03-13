import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePosts } from '../contexts/PostContext';
import { TextField, Button, Typography, Container, Box, Alert } from "@mui/material";
import brandLogo from "../assets/ProductIcon.png";
import { useSnackbar } from "../contexts/SnackbarContext";
import axios from "axios";
import { useUserAuthContext } from '../contexts/UserAuthContext';
import { motion } from "framer-motion";

export default function PostEdit() {
    const { updatePost } = usePosts();
    const { id } = useParams(); // Extract post ID from the URL
    const navigate = useNavigate();
    const [token] = useUserAuthContext(); // Get JWT token from context
    const showSnackbar = useSnackbar(); // Access Snackbar

    const [post, setPost] = useState(null); // Initialize post state
    const [error, setError] = useState(''); // Initialize error state
    const [postContent, setPostContent] = useState(""); // State for post content
    const [postReply, setPostReply] = useState(""); // State for reply content

    // Fetch specific post based on id
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_AUTH_API_URL}/api/posts/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Set authorization header
                    },
                });
                setPost(response.data); // Set the post data
                setPostContent(response.data.content); // Set content from the received post
            } catch (err) {
                setError("Failed to fetch post."); // Handle error if fetching fails
                console.error("Error fetching post:", err);
                showSnackbar("Failed to fetch post."); // Show error snackbar
            }
        };

        fetchPost(); // Call the fetch function
    }, [id, token]); // Dependency array: fetch again if id or token changes

    const handleContentSet = async () => {
        if (!postContent) return;

        await updatePost(id, { content: postContent }); // Update the post
        showSnackbar("Post details updated."); // Show success Snackbar
        navigate('/dashboard'); // Redirect to dashboard after saving
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
                <img
                    src={brandLogo}
                    alt="Logo"
                    style={{
                        display: 'block',
                        margin: '0 auto',
                        width: '20%',
                        maxWidth: '200px',
                        borderRadius: '50%',
                    }}
                />
    
                <Typography
                    variant="h5"
                    sx={{
                        letterSpacing: "1px",
                        padding: "12px", // Adds inner space
                        margin: "16px 0", // Adds space above and below
                        textAlign: "center", // Ensures the text is centered
                    }}
                >
                    Update Post Details
                </Typography>
    
                {/* Post update form */}
                <form onSubmit={(e) => { e.preventDefault(); handleContentSet(); }} style={{ width: "100%" }}>
                    {/* Title Field (Read-Only) */}
                    <TextField
                        fullWidth
                        label="Title"
                        name="title"
                        variant="outlined"
                        value={post?.title || ''}
                        sx={{ marginBottom: 2 }}
                        InputProps={{ readOnly: true, style: { backgroundColor: "#fffff0" } }} // Read-only styling
                    />
    
                    {/* Content Field */}
                    <TextField
                        fullWidth
                        label="Content"
                        name="content"
                        variant="outlined"
                        multiline
                        rows={4}
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
                        sx={{ marginBottom: 2 }}
                        InputProps={{ style: { backgroundColor: "#fffff0" } }}
                    />
    
                    {/* Buttons */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2, gap: 2 }}>
                        {/* Save Button */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                            >
                                Save
                            </Button>
                        </motion.div>
    
                        {/* Reply Button */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => navigate("/dashboard")}
                            >
                                Go back
                            </Button>
                        </motion.div>
                    </Box>
                </form>
            </Box>
        </Container>
    );    
}