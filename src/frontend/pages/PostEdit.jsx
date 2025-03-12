import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePosts } from '../contexts/PostContext';
import { TextField, Button, Typography, Container, Box, Alert } from "@mui/material";
import brandLogo from "../assets/ProductIcon.png";
import { useSnackbar } from "../contexts/SnackbarContext";
import axios from "axios";
import { useUserAuthContext } from '../contexts/UserAuthContext';

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
        <Container component="main" maxWidth="md">
            <Typography variant="h4" gutterBottom>
                Edit Posts
            </Typography>
            {error && <Alert severity="error">{error}</Alert>} {/* Show error if it exists */}

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
                <img src={brandLogo} alt="Logo" style={{ display: 'block', margin: '0 auto', width: '20%', maxWidth: '200px', borderRadius: '50%' }} />
                <Typography variant="h5">Update Post Details</Typography>

                <form onSubmit={(e) => { e.preventDefault(); handleContentSet(); }}>
                    <TextField
                        fullWidth
                        label="Title"
                        name="title"
                        variant="outlined"
                        value={post?.title || ''}
                        sx={{ marginBottom: 2, backgroundColor: "#fffff0" }}
                        disabled // Assuming title shouldn't be editable
                    />
                    <TextField
                        fullWidth
                        label="Content"
                        name="content"
                        variant="outlined"
                        multiline
                        rows={4}
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)} // Update content state
                        sx={{ marginBottom: 2, backgroundColor: "#fffff0" }}
                    />
                    {/* Save Button */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
                        <Button
                            variant="contained"
                            color="secondary"
                            type="submit" // Ensure this button submits the form
                            onClick={() => post && handleContentSet()} // Ensure post is not null
                        >
                            Save
                        </Button>
                    </Box>
                         {/* Reply Button */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
                        <Button
                            variant="contained"
                            color="secondary"
                            type="submit" // Ensure this button redirects to reply page
                            onClick={() => navigate(`/post/${id}/reply`)} // Ensure post is not null
                        >
                            Reply to this post
                        </Button>
                    </Box>
                </form>
            </Box>
        </Container>
    );
}