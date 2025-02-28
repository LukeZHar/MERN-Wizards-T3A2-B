import { useContext } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import { usePosts } from "../frontend/contexts/PostContext";



const PostDetails = () => {
    const {posts, deletePost} = usePosts();


    return (
        <div> 
            <h2>Post Details</h2>
            {
                posts.length === 0 ? (
                    <p>No posts found.  <Link to='/add-post'>Add your first post</Link></p>
            ) : (
                <ul>
                    {tasks.map((post) => 
                        (<li key={post.id}>
                            <strong>{post.title}</strong> : {post.description}
                            <div>
                                <Link to={'/edit-post/${task.id}'}></Link> | {' '}
                                <button onClick={() => deletePost(post.id)}>Delete</button>
                            </div>
                        </li>)
                    )}
                    
                </ul>
            )
        }
        </div>
    );

}

export default PostDetails;
