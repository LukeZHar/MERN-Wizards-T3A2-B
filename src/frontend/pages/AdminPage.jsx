import React, { useEffect, useState } from "react";
import { TextField, Grid, Card, Button, Typography, Container, Box, IconButton, Divider, MenuItem, Select } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useSnackbar } from "../contexts/SnackbarContext";
import useAdmin from "../hooks/useAdmin";
import useUserDetails from "../hooks/useUserDetails";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function AdminPage() {
    const {
        users, posts,
        fetchUsers, fetchPosts,
        updateUserRole, updatePostPriority,
        deleteUser, deletePost
    } = useAdmin();

    const showSnackbar = useSnackbar();
    const { userClass } = useUserDetails(); // Fetch userClass from token
    const navigate = useNavigate();

    // Search states
    const [userSearch, setUserSearch] = useState("");
    const [postPriority, setPostPriority] = useState("");

    // State for storing temporary changes 
    const [priorityUpdates, setPriorityUpdates] = useState({});
    const [userClassUpdates, setUserClassUpdates] = useState({});

    // State for expand post content
    const [expandedPostContent, setExpandedPostContent] = useState({});

    // Redirect if user is not an admin
    useEffect(() => {
        if (userClass !== "Admin") {
            showSnackbar("You are not allowed to access this page.", "error");
            navigate("/");
        }
    }, [userClass, navigate, showSnackbar]);

    // Handle for searching users by email
    const handleUserSearch = async () => {
        await fetchUsers(userSearch);
    };

    // Handle for searching posts by priority
    const handlePostSearch = async () => {
        await fetchPosts(postPriority);
    };

    // Handle for temporary priority selection
    const handlePrioritySelection = (postId, newPriority) => {
        setPriorityUpdates((prev) => ({
            ...prev,
            [postId]: newPriority,
        }));
    };

    // Display post content
    const togglePostContent = (postId) => {
        setExpandedPostContent(prevState => ({
            ...prevState,
            [postId]: !prevState[postId]
        }));
    };

    // Handle applying priority changes
    const handlePrioritySet = async (postId) => {
        const newPriority = priorityUpdates[postId];
        if (!newPriority) return;

        await updatePostPriority(postId, newPriority);
        showSnackbar(`Priority updated to ${newPriority}`, "success");

        // Remove from temporary state
        setPriorityUpdates((prev) => {
            const updated = { ...prev };
            delete updated[postId];
            return updated;
        });
    };

    // Handle temporary user role selection
    const handleUserClassSelection = (userId, newRole) => {
        setUserClassUpdates((prev) => ({
            ...prev,
            [userId]: newRole,
        }));
    };

    // Handle applying user role changes
    const handleUserClassSet = async (userId) => {
        const newRole = userClassUpdates[userId];
        if (!newRole) return;

        await updateUserRole(userId, newRole);
        showSnackbar(`User role updated to ${newRole}`, "success");

        // Remove from temporary state
        setUserClassUpdates((prev) => {
            const updated = { ...prev };
            delete updated[userId];
            return updated;
        });
    };

    return (
        <Container maxWidth="md" component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            {/* Page Header */}
            <Typography variant="h4" align="center" sx={{ marginBottom: 4, fontWeight: 'bold', color: '#333', letterSpacing: "2px" }}>
                Admin Panel
            </Typography>

            <Grid container spacing={3}>
                {/* Manage Posts */}
                <Grid item xs={12} md={6}>
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} whileHover={{ scale: 1.02 }}>
                        <Card sx={{ borderRadius: "12px", backgroundColor: "#00cccc", boxShadow: "0px 2px 10px rgba(0,0,0,0.1)", transition: "0.3s", p: 3 }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white', marginBottom: 2 }}>
                                Manage Posts
                            </Typography>

                            <TextField
                                fullWidth
                                select
                                label="Filter by Priority"
                                value={postPriority}
                                onChange={(e) => setPostPriority(e.target.value)}
                                sx={{ bgcolor: 'white', borderRadius: 1, marginBottom: 2 }}
                            >
                                <MenuItem value="">All</MenuItem>
                                <MenuItem value="Low">Low</MenuItem>
                                <MenuItem value="Medium">Medium</MenuItem>
                                <MenuItem value="High">High</MenuItem>
                            </TextField>

                            <Button variant="contained" color="primary" onClick={handlePostSearch} sx={{ marginBottom: 2 }}>
                                Search Posts
                            </Button>

                            <Divider sx={{ width: "100%", marginBottom: 2, bgcolor: "white" }} />

                            {posts.length > 0 ? posts.map((post) => (
                                <motion.div key={post._id} whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                                    <Box sx={{ bgcolor: 'white', padding: 2, borderRadius: 2, boxShadow: 2, marginBottom: 2 }}>
                                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{post.title}</Typography>

                                        {post.author && (
                                            <Typography variant="subtitle2" sx={{ color: '#777', marginBottom: 1, wordBreak: "break-word"}}>
                                                Author: <strong>{post.author.username}</strong> ({post.author.email})
                                            </Typography>
                                        )}

                                        <Typography variant="body2" sx={{ color: '#777', fontStyle: 'italic', marginBottom: 1 }}>
                                            Priority: {post.priority} | Published on: {post.createdAt}
                                        </Typography>

                                        <Typography variant="body2" sx={{ color: '#555', marginBottom: 1 }}>
                                            {expandedPostContent[post._id] ? post.content : post.content.substring(0, 100) + "..."}
                                        </Typography>

                                        <Button size="small" variant="outlined" sx={{ mt: 1, mb: 1 }} onClick={() => togglePostContent(post._id)}>
                                            {expandedPostContent[post._id] ? "Show Less" : "View Full Post"}
                                        </Button>

                                        <Select
                                            fullWidth
                                            value={priorityUpdates[post._id] ?? post.priority}
                                            onChange={(e) => handlePrioritySelection(post._id, e.target.value)}
                                            sx={{ marginBottom: 2, backgroundColor: "#fffff0" }}
                                        >
                                            <MenuItem value="Low">Low</MenuItem>
                                            <MenuItem value="Medium">Medium</MenuItem>
                                            <MenuItem value="High">High</MenuItem>
                                        </Select>

                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end',flexWrap: "wrap", gap: 1 }}>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={() => handlePrioritySet(post._id)}
                                                disabled={!priorityUpdates[post._id]}
                                            >
                                                Set Priority
                                            </Button>
                                            <IconButton onClick={() => deletePost(post._id)}>
                                                <Delete color="error" />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                </motion.div>
                            )) : <Typography color="white">No posts found</Typography>}
                        </Card>
                    </motion.div>
                </Grid>

                {/* Manage Users */}
                <Grid item xs={12} md={6}>
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} whileHover={{ scale: 1.02 }}>
                        <Card sx={{ borderRadius: "12px", backgroundColor: "#00cccc", boxShadow: "0px 2px 10px rgba(0,0,0,0.1)", transition: "0.3s", p: 3 }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white', marginBottom: 2 }}>
                                Manage Users
                            </Typography>

                            <TextField
                                fullWidth
                                placeholder="Enter user email..."
                                variant="outlined"
                                value={userSearch}
                                onChange={(e) => setUserSearch(e.target.value)}
                                sx={{ bgcolor: 'white', borderRadius: 1, marginBottom: 2 }}
                            />

                            <Button variant="contained" color="primary" onClick={handleUserSearch} sx={{ marginBottom: 2 }}>
                                Search Users
                            </Button>

                            <Divider sx={{ width: "100%", marginBottom: 2, bgcolor: "white" }} />

                            {users.length > 0 ? users.map((user) => (
                                <motion.div key={user._id} whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                                    <Box sx={{ bgcolor: 'white', padding: 2, borderRadius: 2, boxShadow: 2, marginBottom: 2 }}>
                                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: "#333" }}>
                                            {user.username}
                                        </Typography>

                                        <Typography variant="body2" sx={{ color: '#555', marginBottom: 1, wordBreak: "break-word"}}>
                                            {user.email}
                                        </Typography>

                                        <Typography variant="body2" sx={{ color: '#777', fontStyle: 'italic', marginBottom: 1 }}>
                                            {user.userClass}
                                        </Typography>

                                        <Select
                                            fullWidth
                                            value={userClassUpdates[user._id] ?? user.userClass}
                                            onChange={(e) => handleUserClassSelection(user._id, e.target.value)}
                                            sx={{ marginBottom: 2, backgroundColor: "#fffff0" }}
                                        >
                                            <MenuItem value="Regular User">Regular User</MenuItem>
                                            <MenuItem value="Admin">Admin</MenuItem>
                                        </Select>

                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                                            <Button variant="contained" color="secondary" onClick={() => handleUserClassSet(user._id)} disabled={!userClassUpdates[user._id]}>
                                                Set Role
                                            </Button>
                                            <IconButton onClick={() => deleteUser(user._id)}>
                                                <Delete color="error" />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                </motion.div>
                            )) : <Typography color="white">No users found</Typography>}
                        </Card>
                    </motion.div>
                </Grid>
            </Grid>
        </Container>
    );
}    
