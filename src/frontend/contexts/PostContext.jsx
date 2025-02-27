import { createContext, useContext } from "react";


const PostContext = createContext();

export default function PostProvider(props){
    let [posts, setPosts] = useState([]);
    return (
        <PostContext.Provider value={[posts, setPosts]}>
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