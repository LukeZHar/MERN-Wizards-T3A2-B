import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePosts, PostProvider as Post } from '../contexts/PostContext';
import { TextField, Button, Typography, Container, Box, MenuItem, Select } from "@mui/material"; 
import brandLogo from "../assets/ProductIcon.png";
import { useSnackbar } from "../contexts/SnackbarContext";
import axios from "axios";
import { useUserAuthContext } from '../contexts/UserAuthContext';

export default function PostEdit() {
    const {
        users, posts,
        fetchPosts, fetchUsers,
        updatePost,    
    } = usePosts();

    const { id } = useParams();  // gets ID from the URL
    const navigate = useNavigate();
    const [token] = useUserAuthContext(); // Corrected the usage of useUserAuthContext

    // Find posts based on the ID
    const [post, setPost] = useState(null); // Initialize post as null
    const [error, setError] = useState(null); // Initialize error state
    const { showSnackbar } = useSnackbar(); // Destructure showSnackbar from useSnackbar
    
    const [userSearch, setUserSearch] = useState(""); // Initialize userSearch state
    const [postContent, setPostContent] = useState(""); // Initialize postContent state
    const [postReply, setPostReply] = useState(""); // Initialize postReply state

    const handleContentSet = async (postId) => {
        const newContent = postContent;
        if (!newContent) return;

        await updatePost(postId, { content: newContent }); // Corrected function call
        showSnackbar("Post details updated."); // Show success Snackbar
    };

    const handleReply = async (postId) => {
        const newReply = postReply;
        if (!newReply) return;

        await updatePost(postId, { reply: newReply }); // Corrected function call
        showSnackbar("Reply added to post."); // Show success Snackbar
    };

    return (
        <Container component="main" maxWidth="md">
            <Typography variant="h4" gutterBottom>
                Edit Posts
            </Typography>

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
                <img src={brandLogo} alt="Logo" style={{ display: 'block', margin: '0 auto', width: '20%', maxWidth: '200px', borderRadius: '50%' }} />
                <Typography variant="h5">Update Post Details</Typography>

                <form >
                    <TextField
                        fullWidth
                        label="Title"
                        name="title"
                        variant="outlined"
                        value={post?.title || ''}    
                        sx={{ marginBottom: 2, backgroundColor: "#fffff0" }}
                    />
                    <TextField
                        fullWidth
                        label="Content"
                        name="content"
                        variant="outlined"
                        multiline
                        rows={4}
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)} // Corrected state update
                        sx={{ marginBottom: 2, backgroundColor: "#fffff0" }}
                    />
                    {/* Priority label */}
                    <Typography variant="body1">Priority:</Typography>
                    <TextField
                        fullWidth
                        name="priority"
                        value={post?.priority || ''}                    
                        sx={{ marginBottom: 2, backgroundColor: "#fffff0" }}                                 
                    />

                    {/* Category: */}
                    <Typography variant="body1">Category:</Typography>
                    <TextField
                        fullWidth
                        name="category"
                        value={post?.category || ''}                    
                        sx={{ marginBottom: 2, backgroundColor: "#fffff0" }}
                    />

                    {/* Buttons */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
                        <Button variant="contained" color="secondary" onClick={() => handleContentSet(post.id)}>
                            Save
                        </Button>                                          
                    </Box>
                </form>
            </Box>
            {/* Reply to post */}
            <Box sx={{
                bgcolor: '#00cccc', // Background color of the container
                borderRadius: 2,
                padding: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '50px', // Centered with margin above
            }}>
                <Typography variant="h5">Post discussion</Typography>
                <form onSubmit={() => handleReply(post.id)}>
                    <TextField
                        fullWidth
                        label="Username"
                        name="username"
                        variant="outlined"
                        value={post?.username || ''}                
                        onChange={(e) => setUserSearch(e.target.value)} // Corrected state update
                        sx={{ marginBottom: 0, backgroundColor: "#fffff0" }}
                    />
                    <TextField
                        fullWidth
                        label="New Comment"
                        name="newComment"
                        variant="outlined"
                        multiline
                        rows={4}
                        value={postReply}
                        onChange={(e) => setPostReply(e.target.value)} // Corrected state update
                        sx={{ marginBottom: 2, backgroundColor: "#fffff0" }}
                    />
                </form>
            </Box>
        </Container>
    );
}