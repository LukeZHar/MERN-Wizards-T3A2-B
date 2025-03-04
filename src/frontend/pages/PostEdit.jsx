import React, {useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePosts } from '../contexts/PostContext';
import { TextField, Button, Typography, Container, Box } from "@mui/material"; 

import { useSnackbar } from "../contexts/SnackbarContext";


export default function PostEdit () {
    
    const { id } = useParams();  // gets ID from the URL
    const navigate = useNavigate();
    const { posts, editPost} = usePosts();
    
    //find posts based in the ID
    const [post, setPost] = useState([]);

    useEffect(() => {
        //find post
        const foundPost = posts.find((post) => post.id === id);
        // if found
        if (foundPost) {
            setPost(foundPost);
        }
        else {
            console.error(`Post with ID ${id} not found.`);
            //navigate('/add-post')
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

    };

    return (
            // Page styling
            <Container component="main" maxWidth="sm">
                <Box sx={{
                    bgcolor: '#00cccc', // Background color of the container
                    borderRadius: 2,
                    padding: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '100px', // Centered with margin above
                }}>
             <Typography variant="h5">Update Post Details</Typography>
             <form onSubmit={ handleSubmit }>
                <TextField
                     fullWidth
                     label="Title"
                     name="title"
                     variant="outlined"
                     value={post.title}
                     onChange={handleChange}
                       sx={{ marginBottom: 2, backgroundColor: "#fffff0" }}
                                    />
                <TextField
                        fullWidth
                        label="Content"
                        name="content"
                        variant="outlined"
                        multiline
                        rows={4}
                        value={post.content}
                        onChange={handleChange}
                        sx={{ marginBottom: 2, backgroundColor: "#fffff0" }}
                                    />
                {/* Buttons */}
                <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
                   <Button variant="contained" color="secondary" onClick={handleChange}>
                                            Save
                    </Button>
                                        <Button variant="contained" color="primary" type="delete">
                                            Delete
                                        </Button>
                                    </Box>
                                </form>
                            </Box>
                        </Container>
    );
}