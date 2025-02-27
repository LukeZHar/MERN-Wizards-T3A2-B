import React, { useState } from 'react';
import { useLocalStorage } from 'react-use';
import { useNavigate } from 'react-router-dom';



const PostCreation = () => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const [post, setPosts] = useLocalStorage('posts',[]);
    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
        e.preventDefault();

        const newPost = {
            id: Date.now(),
            title,
            description,
        };

        setPosts([...post, newPost]);
        navigate('post');
    }

    return (
    
        <div> 
             <h2>New Post Details</h2>
             <form onSubmit={ handleSubmit }>
                <div>
                    <label>Title: </label>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div>
                    <label>Description: </label>
                    <input value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>
                <button type='submit'>Add Post</button>
             </form>
           
       
         </div>

);
}
export default PostCreation;
