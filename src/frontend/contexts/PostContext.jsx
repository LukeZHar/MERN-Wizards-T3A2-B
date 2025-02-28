import { createContext, useContext } from "react";


const PostContext = createContext();

export default function PostProvider(props){
    let [posts, setPosts] = useState([]);

    // AppPost function
    const addPost = (post) => setPosts((prev) => [...prev, post]);

    // DeletePost function 
    const deletePost = (id) => setPosts((prev) => prev.filter((post) => post.id != id))

    return (
        <PostContext.Provider value={{posts, addPost, deletePost}}>
            {/* const [posts, setPosts] setPostValue(); */}
            {props.children}
        </PostContext.Provider>
    )
}

// Custom hook!
export function usePosts(){
    console.log("Passing data around.");
    let context = useContext(PostContext);
    if (!context){
        console.log("No Post found.");
    }
    return context;
}