import React, { useEffect, useState } from "react";
import { Avatar, Container, Box, Typography, Button, Alert, Card, CardContent, CardActions, Grid, Stack } from "@mui/material";
import { useUserAuthContext } from "../contexts/UserAuthContext"; // Import the authentication 
import axios from "axios";
import { useSnackbar } from "../contexts/SnackbarContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { PostAdd } from "@mui/icons-material";

export default function DashboardPage() {
    const [posts, setPosts] = useState([]); // State for storing posts
    const [error, setError] = useState(''); // State for capturing errors
    const [token] = useUserAuthContext(); // Get JWT token from context
    const [replies, setReplies] = useState({}); // State for replies
    const showSnackbar = useSnackbar(); // Access Snackbar
    const [expandedPosts, setExpandedPosts] = useState({});
    const [expandedPostContent, setExpandedPostContent] = useState({});
    const navigate = useNavigate();

    // Fetch posts on component mount
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_AUTH_API_URL}/api/posts`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Set authorization header
                    },
                });
                const sortedPosts = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setPosts(sortedPosts); // Set posts received from the server
            } catch (error) {
                console.error("Error fetching posts:", error);
                setError("Failed to fetch posts. Please try again later."); // Capture error message
            }
        };

        fetchPosts(); // Call the fetch function
    }, [token]); // The dependency array ensures this effect runs when the token changes

    const handleDelete = async (id) => {
        try {
            // Send DELETE request to the API
            await axios.delete(`${import.meta.env.VITE_AUTH_API_URL}/api/posts/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Update the local state to remove the deleted post
            setPosts(prev => prev.filter(post => post._id !== id));

            showSnackbar("Post deleted successfully!"); // Show success Snackbar
        } catch (error) {
            console.error("Error deleting post:", error);

            // Check if error response exists
            if (error.response) {
                if (error.response.status === 403) {
                    showSnackbar("You are not authorized to delete this post.");
                } else {
                    showSnackbar("Failed to delete post.");
                }
            } else {
                showSnackbar("An unexpected error occurred.");
            }
        }
    };

    // Function to fetch replies from a specific post
    const fetchReplies = async (postId) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_AUTH_API_URL}/api/reply/posts/${postId}/replies`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setReplies((prev) => ({
                ...prev,
                [postId]: response.data, // Store replies using post ID as the key
            }));
        } catch (error) {
            console.error("Error fetching replies:", error);
            showSnackbar("Failed to fetch replies.");
        }
    };

    // Function toggle replies
    const toggleReplies = async (postId) => {
        if (!expandedPosts[postId]) { // Conditional check
            if (!replies[postId]) await fetchReplies(postId);
        }
        setExpandedPosts(prev => ({
            ...prev,
            [postId]: !prev[postId]
        }));
    };

    const togglePostContent = (postId) => {
        setExpandedPostContent(prev => ({
            ...prev,
            [postId]: !prev[postId],
        }));
    };

    return (
        <Container maxWidth="lg" component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Typography variant="h4" sx={{ letterSpacing: "2px", fontWeight: "bold", textAlign: "center", mb: 4 }}>Dashboard</Typography>

            {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="contained" onClick={() => navigate("/add-post")} sx={{ px: 3, py: 1.2, display: "flex", alignItems: "center", gap: 1 }}>
                        <PostAdd sx={{ fontSize: "1.3rem" }} />
                        Create New Post
                    </Button>
                </motion.div>
            </Box>

            <Typography variant="h5" sx={{ letterSpacing: "1px", fontWeight: 600, borderBottom: "2px solid #ddd", pb: 1, mb: 3 }}>Recent Posts</Typography>

            <Grid container spacing={3}>
                {posts.length > 0 ? posts.map(post => (
                    <Grid item xs={12} sm={6} md={4} key={post._id}>
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} whileHover={{ scale: 1.02 }}>
                            <Card sx={{ borderRadius: "12px", backgroundColor: "#fffff0", overflow: "hidden", boxShadow: "0px 2px 10px rgba(0,0,0,0.1)", transition: "0.3s" }}>
                                <CardContent sx={{ borderTop: "1px solid #eee" }}>
                                <Typography variant="body2" sx={{ mt: 1,mb: "8px", fontStyle: "italic", color: "#708090"}}>
                                    Priority: {post.priority} | Category: {post.category}
                                    </Typography>
                                    <Typography variant="h6" sx={{ fontWeight: 600, color: "#000" }}>{post.title}</Typography>
                                    <Typography variant="body2" sx={{ mt: 1, color: "#000" }}>
                                        {expandedPostContent[post._id] ? post.content : post.content.substring(0, 100) + "..."}
                                    </Typography>
                                    <Button onClick={() => togglePostContent(post._id)} size="small">
                                        {expandedPostContent[post._id] ? "Show Less" : "Read More"}
                                    </Button>
                                    <Typography variant="caption" sx={{ mt: 1, color: "#888" }}>
                                        {post.createdAt || "Date not available"}
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
                                    <Button size="small" onClick={() => toggleReplies(post._id)}>
                                        {expandedPosts[post._id] ? "Hide Replies" : "View Replies"}
                                    </Button>
                                    <Box>
                                        <Button size="small" onClick={() => navigate(`/reply/${post._id}`)}>Reply</Button>
                                        <Button size="small" onClick={() => navigate(`/edit-post/${post._id}`)}>Edit</Button>
                                        <Button size="small" onClick={() => handleDelete(post._id)}>Delete</Button>
                                    </Box>
                                </CardActions>
                                <AnimatePresence>
                                    {expandedPosts[post._id] && replies[post._id] && replies[post._id].length > 0 && (
                                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.4 }}>
                                            <CardContent sx={{ borderTop: "2px solid #ddd", backgroundColor: "#f9f9f9", p: 2 }}>
                                                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: "primary.main" }}>
                                                    Replies ({replies[post._id].length})
                                                </Typography>
                                                {replies[post._id].map((reply, index) => {
                                                    // Extract user initials
                                                    const initials = reply.userId?.username
                                                        ? reply.userId.username.split(" ").map(name => name[0]).join("").toUpperCase()
                                                        : "?";

                                                    return (
                                                        <motion.div key={reply._id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ delay: index * 0.1, duration: 0.3 }}>
                                                            <Box sx={{ display: "flex", alignItems: "center", gap: 2, p: 2, mb: 2, borderRadius: "12px", background: "#fff", boxShadow: "0px 4px 10px rgba(0,0,0,0.1)", transition: "0.3s", "&:hover": { transform: "scale(1.03)", boxShadow: "0px 6px 15px rgba(0,0,0,0.2)" } }}>
                                                                <Avatar
                                                                    sx={{
                                                                        bgcolor: "#00cccc", // Primary theme color
                                                                        color: "#fff", // White text for contrast
                                                                        fontWeight: "bold",
                                                                        width: 44,
                                                                        height: 44,
                                                                        fontSize: "1rem",
                                                                        borderRadius: "12px", // Slight rounding for a sleek look
                                                                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Soft shadow
                                                                        transition: "0.3s",
                                                                        "&:hover": {
                                                                            transform: "scale(1.05)", // Slight hover effect
                                                                            boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.15)", // Enhanced depth
                                                                        }
                                                                    }}
                                                                >
                                                                    {initials}
                                                                </Avatar>

                                                                <Box>
                                                                <Stack spacing={0.5}>
                                                                    <Typography variant="body2" sx={{ fontWeight: "bold", color: "primary.main" }}>{reply.userId?.username}</Typography>
                                                                    <Typography variant="body2" sx={{ color: "#333" }}>{reply.content}</Typography>
                                                                    <Typography variant="body2" sx={{ fontStyle: "italic", textAlign: "right", mt: 1 }}>
                                                                        {reply.createdAt || "Date not available"}
                                                                    </Typography>
                                                                    </Stack>
                                                                </Box>
                                                            </Box>
                                                        </motion.div>
                                                    );
                                                })}
                                            </CardContent>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </Card>
                        </motion.div>
                    </Grid>
                )) : <Typography variant="body1" sx={{ mt: 2 }}>No posts to display.</Typography>}
            </Grid>
        </Container>
    );
}
