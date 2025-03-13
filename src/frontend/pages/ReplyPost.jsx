import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Alert, Box } from '@mui/material';
import axios from 'axios';
import { useUserAuthContext } from '../contexts/UserAuthContext';
import { useSnackbar } from "../contexts/SnackbarContext";
import { motion } from "framer-motion";

function ReplyPost() {
    const { id } = useParams(); // Extract the post ID from URL
    const [post, setPost] = useState(null);
    const [replyContent, setReplyContent] = useState('');
    const [error, setError] = useState('');
    const [token] = useUserAuthContext(); // Get JWT token
    const [loading, setLoading] = useState(false)

    const showSnackbar = useSnackbar();
    const navigate = useNavigate();

    // Fetch post details
    const fetchPost = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_AUTH_API_URL}/api/posts/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setPost(response.data);
        } catch (err) {
            setError("Failed to fetch post details.");
            console.error(err);
        }
    };

    useEffect(() => {
        fetchPost();
    }, [id, token]);

    // Handle reply submission
    const handleReplySubmit = async (e) => {
        e.preventDefault();

        if (!replyContent.trim()) {
            showSnackbar("Reply content cannot be empty.");
            return;
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_AUTH_API_URL}/api/reply/posts/${id}/replies`,
                { content: replyContent },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            showSnackbar("Reply added!");
            setReplyContent(''); // Clear reply input
            navigate('/dashboard');
        } catch (error) {
            console.error("Error submitting reply:", error);
            showSnackbar("Failed to submit reply.");
        }
    };

    return (
        <Container
            component="main"
            maxWidth="md"
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: { xs: 2, sm: 4 }
            }}
        >
            {/* Page Title */}
            <Typography
                variant="h3"
                gutterBottom
                sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    letterSpacing: "1px",
                    fontSize: { xs: "1.8rem", sm: "2.2rem" }
                }}
            >
                Post Details
            </Typography>

            {/* Error Handling */}
            {error ? (
                <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
            ) : post ? (
                <>
                    {/* Post Content */}
                    <Box
                        sx={{
                            bgcolor: "#f9f9f9",
                            padding: { xs: 2, sm: 3 },
                            borderRadius: 2,
                            boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
                            mb: 3
                        }}
                    >
                        {/* Post Title */}
                        <Typography variant="h5" sx={{ fontWeight: 600 }}>{post.title}</Typography>

                        {/* Post Metadata */}
                        <Typography
                            variant="body2"
                            sx={{
                                color: "#777",
                                mt: 1,
                                fontSize: { xs: "0.9rem", sm: "1rem" }
                            }}
                        >
                            <strong>Published:</strong> {post.createdAt} |
                            <strong> Priority:</strong> {post.priority} |
                            <strong> Category:</strong> {post.category}
                        </Typography>

                        {/* Post Content */}
                        <Typography
                            variant="body1"
                            sx={{
                                mt: 2,
                                color: "#333",
                                fontSize: { xs: "1rem", sm: "1.1rem" }
                            }}
                        >
                            {post.content}
                        </Typography>
                    </Box>

                    {/* Reply Form */}
                    <form onSubmit={handleReplySubmit} style={{ width: "100%" }}>
                        <TextField
                            fullWidth
                            label="Add a reply"
                            variant="outlined"
                            multiline
                            rows={4}
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            sx={{ marginBottom: 2, marginTop: 4 }}
                        />

                        {/* Submit Button with Hover Effect */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                sx={{
                                    width: { xs: "100%", sm: "auto" },
                                    py: 1.2,
                                    fontSize: "1rem"
                                }}
                            >
                                Submit Reply
                            </Button>
                        </motion.div>
                    </form>
                </>
            ) : (
                <Typography sx={{ textAlign: "center", fontSize: "1.2rem" }}>Loading post...</Typography>
            )}
        </Container>
    );
}

export default ReplyPost;
