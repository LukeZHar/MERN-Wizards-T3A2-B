import React, { useState } from "react";
import { usePosts } from "../contexts/PostContext";

export default function PostCreation() {
    // State for form inputs
    const [post, setPost] = useState({
        title: "",
        content: "",
        priority: "Low",
        category: "Option 1"
    });

    // Import addPost function from 'Post Context'
    const { addPost } = usePosts();

    // Function to handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPost((prev) => ({ ...prev, [name]: value }));
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!post.title.trim() || !post.content.trim()) {
            alert("Title and Content cannot be empty!");
            return;
        }

        addPost({ ...post, id: Date.now() })
        console.log("New Post Added:", post);

        handleClear();
    };

    // Function to reset the form
    const handleClear = () => {
        setPost({
            title: "",
            content: "",
            priority: "Low",
            category: "Option 1"
        });

        console.log("Form has been cleared!");
    };

    return (
        <div className="post-creation-container">
            <h1>Post Creation</h1>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input
                    type="text"
                    name="title"
                    placeholder="Please enter the title here..."
                    value={post.title}
                    onChange={handleChange} required />

                <label>Content:</label>
                <textarea
                    name="content"
                    placeholder="Please enter the content here..."
                    value={post.content}
                    onChange={handleChange}
                    style={{ resize: "none" }}
                    required />

                <label>Priority label:</label>
                <select name="priority"
                    value={post.priority}
                    onChange={handleChange}>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                </select>

                <label>Category:</label>
                <select name="category"
                    value={post.category}
                    onChange={handleChange}>
                    <option>Option 1</option>
                    <option>Option 2</option>
                    <option>Option 3</option>
                    <option>Option 4</option>
                </select>

                <button type="button" onClick={handleClear}>Clear</button>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
