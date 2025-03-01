import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePosts } from '../frontend/contexts/PostContext';



const PostCreation = () => {
    const [post, setPost] = useState({
        title: '', description: ''
    });

    const { addPost } = usePosts();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setPost((prev) => ({...prev, [name]: value}));
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();

        // add post in context
        addPost({...post, id: Date.now().toString() });
        //redirect to post details page
        navigate('/post');
    };

    return (
         <div> 
             <h2>New Post Details</h2>
             <form onSubmit={ handleSubmit }>
                <div>
                    <label>Title: </label>
                    <input 
                    type='text' 
                    name='title' 
                    value={post.title} 
                    onChange={handleChange} required />
                </div>
                <div>
                    <label>Description: </label>
                    <textarea             
                    name='description'
                    value={post.description} 
                    onChange={handleChange} required />
                </div>
                <button type='submit'>Add Post</button>
             </form>       
         </div>
    );
}
export default PostCreation;
