import { useContext } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import { useLocalStorage } from 'react-use';

//const posts = usePosts(); 
//console.log(posts);


const PostDetails = () => {
    const [posts, setPosts] = useLocalStorage('posts',[]);

    const deletePost = (id) => {
        const updatedPosts = task.filter((task) => task.id != id);
        setPosts(updatedPosts);
    }

    return (
        <div> 
            <h2>Post Details</h2>
            {
                posts.length === 0 ? (
                    <p>No posts found.  <Link to='/add-post'>Add your first post</Link></p>
            ) : (
                <ul>
                    {tasks.map((task) => 
                        (<li key={task.id}>
                            <strong>{task.title}</strong> : {task.description}
                            <div>
                                <Link to={'/edit-post/${task.id}'}></Link> | {' '}
                                <button onClick={() => deletePost(task.id)}>Delete</button>
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
