import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Alert, Box } from '@mui/material';
import axios from 'axios';
import { useUserAuthContext } from '../contexts/UserAuthContext';
import { useSnackbar } from "../contexts/SnackbarContext";

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
            const response = await axios.post(`${import.meta.env.VITE_AUTH_API_URL}/api/posts/${id}/reply`,
                { content: replyContent },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            showSnackbar("Reply added!");
            setReplyContent(''); // Clear reply input
        } catch (error) {
            console.error("Error submitting reply:", error);
            showSnackbar("Failed to submit reply.");
        }
    };

    return (
        <Container component="main" maxWidth="md">
            <Typography variant="h4" gutterBottom>
                Post Details
            </Typography>
            {error ? (
                <Alert severity="error">{error}</Alert>
            ) : post ? (
                <>
                    <Box>
                        <Typography variant="h5">{post.title}</Typography>
                        <Typography variant="body1">{post.content}</Typography>
                    </Box>

                    <form onSubmit={handleReplySubmit}>
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
                        <Button variant="contained" color="primary" type="submit">
                            Submit Reply
                        </Button>
                    </form>
                </>
            ) : (
                <Typography>Loading post...</Typography>
            )}
        </Container>
    );
}

export default ReplyPost;