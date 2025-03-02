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

    return (
        <PostContext.Provider value={{ posts, addPost }}>
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


