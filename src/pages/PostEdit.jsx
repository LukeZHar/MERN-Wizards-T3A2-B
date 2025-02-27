import React from 'react';
import { useParams } from 'react-router-dom';

const PostEdit = () => {
    const { taskID } = useParams();   
    return ( 
        <div> 
        <h2>Update Post Details</h2>
        <p>Post ID: {taskID}</p>
        <p>Update or comment on a task.</p>
        
    </div>
    )
};

export default PostEdit;
