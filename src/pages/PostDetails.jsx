import React from 'react';
import { Link } from 'react-router-dom';
import { useLocalStorage } from 'react-use';

const PostDetails = () => {
    const [posts, setPosts] = useLocalStorage('posts',[]);



    return (
        <div> 
            <h2>Post Details</h2>
            {
                posts.length === 0 ? (
                    <p>No posts found.  <Link to='/add-post'>Add your first post</Link></p>
            ) : (
                <ul>
                    {tasks.map((task) => {
                        (<li key={task.id}>
                            <strong>{task.title}</strong> : {task.description}
                        </li>)
                    })}
                    
                </ul>
            )
        }
        </div>
    );

}

export default PostDetails;
