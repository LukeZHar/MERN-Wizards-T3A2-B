import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { usePosts } from "../frontend/contexts/PostContext";
import '../index.css';
//import '../frontend/styles/PostDetails.css';


export default function PostDetails() {
    const {posts, deletePost} = usePosts();
    const [visiblePosts, setVisiblePosts] =useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const loadMoreRef = useRef (null);

    useEffect(() => {
        // load tasks
        setVisiblePosts(posts.slice(0, 5));
        }, [posts]);

    const loadMorePosts = () => {
        if (!isFetching && visiblePosts.length < tasks.length) {
            setIsFetching(true);
            // fetch new visible post
            const newVisiblePost = post.slice(0, visiblePosts.length + 3);  
            // simulate loading post
            setTimeout(() => {
                setVisiblePost(newVisiblePost);
                setIsFetching(false);
            }, 500); // Simulate delay
        }
    };
    
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    loadMorePosts();
                }
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 1.0
            }
        );
        if(loadMoreRef.current) observer.observe(loadMoreRef.current);

        return() => {
            if(loadMoreRef.current) observer.observe(loadMoreRef.current);
        };
    }, [visiblePosts]);

    return (
        <div> 
            <h2>Post Details</h2>
            {
                posts.length === 0 ? (
                    <p>No posts found.  <Link to='/add-post'>Add your first post</Link></p>
            ) : (
                <ul>
                    {visiblePosts.map((post) => 
                        (<li key={post.id}>
                            <strong>{post.title}</strong> : {post.description}
                            <div>
                                <Link to={'/edit-post/${post.id}'}></Link> | {' '}
                                <button onClick={() => deletePost(post.id)}>Delete</button>
                            </div>
                        </li>)
                    )}
                    
                </ul>
            )
        }

        {
            visiblePosts.length <tasks.length && (
                <div ref={loadMoreRef}>
                    {isFetching ? <p>Loading more posts...</p> : <p>Scroll down for more.</p>}
                </div>
            )
        }
        </div>
    );

}


