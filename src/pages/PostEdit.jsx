import React, {useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePosts } from '../frontend/contexts/PostContext';
import '../index.css';
//import '../frontend/styles/PostEdit.css';

export default function PostEdit () {

    const { postID } = useParams();  // gets ID from the URL
    const navigate = useNavigate();
    const { posts, editPost} = usePosts();
    
    //find posts based in the ID
    const [post, setPost] = useState(null);

    useEffect(() => {
        //find post
        const foundPost = posts.find((post) => post.id === id);
        // if found
        if (foundPost) {
            setPost(foundPost);
        }
        else {
            console.error(`Post with ID ${id} not found.`);
            navigate('/post')
        }
    }
        , [id, posts,navigate]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setPost((prev) => ({...prev, [name]: value}));
    }
    
    
    const handleSubmit = (e) => {
        e.preventDefault();

        // update task in context
       editPost(post);

       //redirects to posts details page
       navigate('/post');
    };

    return ( 
        <div> 
             <h2>Update Post Details</h2>
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
                <button type='submit'>Save changes</button>
             </form>       
         </div>
    )
};

