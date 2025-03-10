import { createContext, useContext, useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from 'axios';

// Create an instance of Context
const PostContext = createContext();

// Create the Provider function
export function PostProvider({ children }) {
    const [posts, setPosts] = useState([]);
    const { isLoggedIn } = useAuth(); // Auth hook
    const API_URL = `${import.meta.env.VITE_AUTH_API_URL}/api/posts`; // Adjust as necessary

    // Add Post function using spread operator 
    const addPost = (newPost) => {
        if (!isLoggedIn()) {
            console.log("Unauthorized: User must be logged in to create post.");
            return;
        }

        setPosts((prevPosts) => [...prevPosts, newPost]);
    }

    // Update Post function
    const updatePost = async (id, data, showSnackbar) => {
        if (!isLoggedIn()) {
            console.log("Unauthorized: User must be logged in to update post.");
            return;
        }

        try {
            const response = await axios.patch(`${API_URL}/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Use your token management here
                },
            });
            // Update posts state with the updated post if necessary
            setPosts((prevPosts) =>
                prevPosts.map(post => (post.id === id ? response.data : post))
            );
            return response.data; // Return the updated post data
        } catch (error) {
            console.error("Error updating post:", error);

            // Check if the error response exists and handle it
            if (error.response) {
                if (error.response.status === 403) {
                    showSnackbar("You are not authorized to edit this post."); // Show snackbar on 403
                } else {
                    showSnackbar("Failed to update post."); // Generic error message for other errors
                }
            } else {
                showSnackbar("An unexpected error occurred."); // Catch-all for unforeseen error situations
            }

            throw new Error("Failed to update post."); // Rethrow or log the error
        }
    };

    return (
        <PostContext.Provider value={{ posts, addPost, updatePost }}>
            {children}
        </PostContext.Provider>
    );
}

// Create custom hook
export function usePosts() {
    let context = useContext(PostContext);
    if (!context) {
        console.log("PostContext must be used within a PostContextProvider");
    }
    return context;
}

