import { createContext, useContext, useState } from "react";

// Create an instance of Context
const PostContext = createContext();

// Create the Provider function
export function PostProvider({ children }) {
    const [posts, setPosts] = useState([]);

    // Add Post function using spread operator 
    const addPost = (newPost) => {
        setPosts((prevPosts) => [...prevPosts, newPost]);
    }

    // Delete Post function
    const deletePost = (id) => setPosts((prev) => prev.filter((post) => post.id != id))

    // Edit Post function
    const editPost = (updatedPost) => {
        setPosts((prev) => 
            prev.map(
                (post) => (
                    post.id === updatedPost.id ?
                    {...post, ...updatedPost} :
                    post
                )))
    } 

    return (
        <PostContext.Provider value={{ posts, addPost, deletePost,editPost }}>
            {children}
        </PostContext.Provider>
    )
}

// Create custom hook
export function usePosts() {
    let context = useContext(PostContext);
    if(!context) {
        console.log("No Posts found!")
    }
    return context;
}

