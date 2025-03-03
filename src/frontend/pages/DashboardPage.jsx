import React, { useEffect, useState } from "react";
import { Container, Typography, Button, Alert, Card, CardContent, CardActions, Grid2 } from "@mui/material";
import { useUserAuthContext } from "../contexts/UserAuthContext"; // Import the authentication context
import { PostProvider as Post } from "../contexts/PostContext"; // Import Post component to display posts
import axios from "axios"; // Import axios for making API requests
import { useSnackbar } from '../contexts/SnackbarContext';


export default function DashboardPage() {
    const [posts, setPosts] = useState([]); // State for storing posts
    const [error, setError] = useState(''); // State for capturing errors
    const [token] = useUserAuthContext(); // Get JWT token from context
    const showSnackbar = useSnackbar(); // Access Snackbar

    // Fetch posts on component mount
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_AUTH_API_URL}/api/posts`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Set authorization header
                    },
                });
                setPosts(response.data); // Set posts received from the server
            } catch (error) {
                console.error("Error fetching posts:", error);
                setError("Failed to fetch posts. Please try again later."); // Capture error message
            }
        };

        fetchPosts(); // Call the fetch function
    }, [token]); // The dependency array ensures this effect runs when the token changes

    const handleDelete = async (postId) => {
        try {
            // Send DELETE request to the API
            await axios.delete(`${import.meta.env.VITE_AUTH_API_URL}/api/posts/${postId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // Update the local state to remove the deleted post
            setPosts(prev => prev.filter(post => post._id !== postId));
            showSnackbar("Post deleted successfully!"); // Show success Snackbar
        } catch (error) {
            showSnackbar("Failed to delete post."); // Show error Snackbar
        }
    };

    return (
        <Container component="main" maxWidth="md">
            <Typography variant="h4" gutterBottom>
                Your Dashboard
            </Typography>
            {error && <Alert severity="error">{error}</Alert>} {/* Show error if it exists */}

            <Typography variant="h6">Your Posts</Typography>
            <Grid2 container spacing={2}>
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <Grid2 xs={12} sm={6} md={4} key={post._id}>
                            <Card sx={{ marginBottom: 2 }}>
                                <CardContent>
                                    <Typography variant="h5">{post.title}</Typography>
                                    <Typography variant="body2">{post.content.substring(0, 100)}...</Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" onClick={() => {/* Logic to navigate to post details */ }}>
                                        View
                                    </Button>
                                    <Button size="small" onClick={() => {/* Logic to navigate to edit post */ }}>
                                        Edit
                                    </Button>
                                    <Button size="small" onClick={() => {() => handleDelete(post._id)}}>
                                        Delete
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid2>
                    ))
                ) : (
                    <Typography variant="body1">No posts to display.</Typography>
                )}
            </Grid2>

            <Button
                variant="contained"
                color="primary"
                onClick={() => {/* Logic to navigate to the post creation page */ }}
                sx={{ mt: 2 }}
            >
                Create New Post
            </Button>
        </Container>
    );
}