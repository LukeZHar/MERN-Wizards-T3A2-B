import { useEffect, useState } from "react";
import axios from "axios"; // Apis Calls
import { useUserAuthContext } from "../contexts/UserAuthContext"; // Import Token from context

export function useAdmin() {
    const [token] = useUserAuthContext(); // Get token from context
    const [users, setUsers] = useState([]); // Set state for users
    const [posts, setPosts] = useState([]); // Set state for posts
    const [loading, setLoading] = useState(false); // Set state for loading
    const [userFilters, setUserFilters] = useState({ username: "", email: "", userClass: "" }); // Filters state
    const [postFilters, setPostFilters] = useState({ author: "", priority: "", category: "" });

    // Fetch users
    const fetchUsers = async (filters = {}) => {
        setLoading(true); // prevents multiple requests
        try {
            const queryParams = new URLSearchParams(filters).toString();  // fetch filter
            const response = await axios.get(`/api/admin/users?${queryParams}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            console.log(response.data); // debug purposes
            setUsers(response.data); // display users
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch posts
    const fetchPosts = async (filters = {}) => {
        setLoading(true);
        try {
            const queryParams = new URLSearchParams(filters).toString(); 
            const response = await axios.get(`/api/admin/posts?${queryParams}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setPosts(response.data); // display posts
        } catch (error) {
            console.error("Error fetching posts:", error);
        } finally {
            setLoading(false);
        }
    };

    // Update user role - Regular User or Admin User
    const updateUserRole = async (userId, newRole) => {
        try {
            await axios.patch(`/api/admin/users/${userId}`, { userClass: newRole }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchUsers(); // Refresh user list
        } catch (error) {
            console.error("Error updating user role:", error);
        }
    };

    // Update post priority - High, Medium, Low
    const updatePostPriority = async (postId, newPriority) => {
        try {
            await axios.patch(`/api/admin/posts/${postId}`, { priority: newPriority }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchPosts(); // Refresh post list
        } catch (error) {
            console.error("Error updating post priority:", error);
        }
    };

    // Delete user
    const deleteUser = async (userId) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        try {
            await axios.delete(`/api/admin/users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchUsers(); // Refresh user list
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    // Delete post
    const deletePost = async (postId) => {
        if (!window.confirm("Are you sure you want to delete this post?")) return;
        try {
            await axios.delete(`/api/admin/posts/${postId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchPosts(); // Refresh post list
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    useEffect(() => {
        fetchUsers(userFilters);
        fetchPosts(postFilters);
    }, [token, userFilters, postFilters]); // Runs when token/ filters updates

    // Returns function
    return {
        users, posts, loading,
        fetchUsers, fetchPosts,
        updateUserRole, updatePostPriority,
        deleteUser, deletePost,
        setUserFilters, setPostFilters
    };
}

export default useAdmin;