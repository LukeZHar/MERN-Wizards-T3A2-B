import React, {useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePosts } from '../contexts/PostContext';
import { TextField, Button, Typography, Container, Box, MenuItem, Select } from "@mui/material"; 
import brandLogo from "../assets/ProductIcon.png"
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
                    <img src={brandLogo} alt="Logo" style={{ display: 'block', margin: '0 auto', width: '20%', maxWidth: '200px', borderRadius: '50%' }} /> 
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
                                     {/* Priority label */}
                    <Typography variant="body1">Priority:</Typography>
                    <Select
                        fullWidth
                        name="priority"
                        value={post.priority}
                        onChange={handleChange}
                        sx={{ marginBottom: 2, backgroundColor: "#fffff0" }}
                    >
                        <MenuItem value="Low">Low</MenuItem>
                        <MenuItem value="Medium">Medium</MenuItem>
                        <MenuItem value="High">High</MenuItem>
                    </Select>

                    {/* Category: */}
                    <Typography variant="body1">Category:</Typography>
                    <Select
                        fullWidth
                        name="category"
                        value={post.category}
                        onChange={handleChange}
                        sx={{ marginBottom: 2, backgroundColor: "#fffff0" }}
                    >
                        <MenuItem value="Option 1">Option 1</MenuItem>
                        <MenuItem value="Option 2">Option 2</MenuItem>
                        <MenuItem value="Option 3">Option 3</MenuItem>
                        <MenuItem value="Option 4">Option 4</MenuItem>
                    </Select>

                {/* Buttons */}
                <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
                   <Button variant="contained" color="secondary" onClick={handleChange}>
                                            Save
                    </Button>     

                   <Button variant="contained" color="secondary" onClick={handleChange}>
                                            Reply
                    </Button>

                    <Button variant="contained" color="primary" type="delete">
                                            Delete
                    </Button>
                </Box>
            </form>
             </Box>
             <Box sx={{
                    bgcolor: '#00cccc', // Background color of the container
                    borderRadius: 2,
                    padding: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '50px', // Centered with margin above
                }}>
                    
             <Typography variant="h5">Post discussion</Typography>
             <form onSubmit={ handleSubmit }>
                <TextField
                     fullWidth
                     label="Username"
                     name="title"
                     variant="outlined"
                     value={post.title}
                     onChange={handleChange}
                       sx={{ marginBottom: 0, backgroundColor: "#fffff0" }}
                                    />
                <TextField
                        fullWidth
                        label="Latest Comment"
                        name="comment"
                        variant="outlined"
                        multiline
                        rows={4}
                        value={post.content}
                        onChange={handleChange}
                        sx={{ marginBottom: 2, backgroundColor: "#fffff0" }}
                                    />
                </form>                   
                                   <form onSubmit={ handleSubmit }>
                <TextField
                     fullWidth
                     label="Username"
                     name="title"
                     variant="outlined"
                     value={post.title}
                     onChange={handleChange}
                       sx={{ marginBottom: 0, backgroundColor: "#fffff0" }}
                                    />
                <TextField
                        fullWidth
                        label="Previous Comment"
                        name="comment"
                        variant="outlined"
                        multiline
                        rows={4}
                        value={post.content}
                        onChange={handleChange}
                        sx={{ marginBottom: 2, backgroundColor: "#fffff0" }}
                                    />

                    
            </form>
             </Box>
        </Container>
        
    );
}