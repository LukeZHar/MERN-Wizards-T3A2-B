import { useEffect, useState } from "react";
import axios from "axios"; // API Calls
import { useUserAuthContext } from "../contexts/UserAuthContext"; // Import Token from context

export function useAdmin() {
    const [token, , , userId, userClass] = useUserAuthContext(); // Get token and user details
    const [users, setUsers] = useState([]); // Set state for users
    const [posts, setPosts] = useState([]); // Set state for posts
    const [loading, setLoading] = useState(false); // Set state for loading

    // Verify if user is admin first
    const isAdmin = userClass === "Admin";

    // Fetch users
    const fetchUsers = async (email = "") => {
        if (!isAdmin) return; // return if user is not authorized
        setLoading(true);
        try { // Fetch email
            const queryParams = email ? `email=${encodeURIComponent(email)}` : "";
            const response = await axios.get(`${import.meta.env.VITE_AUTH_API_URL}/api/admin/users${queryParams ? `?${queryParams}` : ""}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            if (response.data.length === 0) {
                setUsers([]); // Clear posts if no results are found
                return [];
            }

            setUsers(response.data); // Update Users state
            return response.data; 
        } catch (error) { // Display error msg
            console.error("Error fetching users:", error);
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    // Fetch posts
    const fetchPosts = async (priority = "") => {
        if (!isAdmin) return;
        setLoading(true);
        try { // Fetch priority
            const queryParams = priority ? `priority=${encodeURIComponent(priority)}` : ""; 
            const response = await axios.get(`${import.meta.env.VITE_AUTH_API_URL}/api/admin/posts${queryParams ? `?${queryParams}` : ""}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data.length === 0) {
                setPosts([]); // Clear posts if no results are found
            }
            
            setPosts(response.data); // Update Posts state
            return response.data; // Return data
        } catch (error) {
            console.error("Error fetching posts:", error);
            setPosts([]);
            return [];
        } finally {
            setLoading(false);
        }
    };

    // Update user role - Regular User or Admin User
    const updateUserRole = async (userId, newRole) => {
        if (!isAdmin) return;
        try {
            await axios.patch(`${import.meta.env.VITE_AUTH_API_URL}/api/admin/users/${userId}`, { userClass: newRole }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            await fetchUsers(); // Refresh user list
        } catch (error) {
            console.error("Error updating user role:", error);
        }
    };

    // Update post priority - High, Medium, Low
    const updatePostPriority = async (postId, newPriority) => {
        if (!isAdmin) return;
        try {
            await axios.patch(`${import.meta.env.VITE_AUTH_API_URL}/api/admin/posts/${postId}`, { priority: newPriority }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            await fetchPosts(); // Refresh post list
        } catch (error) {
            console.error("Error updating post priority:", error);
        }
    };

    // Delete user
    const deleteUser = async (userId) => {
        if (!isAdmin) return;
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        try {
            await axios.delete(`${import.meta.env.VITE_AUTH_API_URL}/api/admin/users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            await fetchUsers();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    // Delete post
    const deletePost = async (postId) => {
        if (!isAdmin) return;
        if (!window.confirm("Are you sure you want to delete this post?")) return;
        try {
            await axios.delete(`${import.meta.env.VITE_AUTH_API_URL}/api/admin/posts/${postId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            await fetchPosts(); // Refresh post list
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    useEffect(() => {
        if(isAdmin) {
            fetchUsers();
            fetchPosts();
        }
    }, [token, userClass]); // Runs when token changes

    // Return functions
    return {
        users, posts, loading,
        fetchUsers, fetchPosts,
        updateUserRole, updatePostPriority,
        deleteUser, deletePost
    };
}

export default useAdmin;
