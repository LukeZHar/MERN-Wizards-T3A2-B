import React, { createContext, useContext, useState } from "react";

// Create an instance of Context
const UserProfileContext = createContext();

// Create the Provider function
export function UserProfileProvider({ children }) {
    // Dummy user data
    const [user, setUser] = useState({
        name: "Jessica",
        businessUnit: "IT Department",
        profilePic: "/images/profile-placeholder.png",
        email: "jessica@example.com",
        phone: "123-456-7890",
        userAccess: "Admin", 
        password: "############", // Hashed password
        changePassword: "",
        isAdmin: false, 
        myTasks: {
            currentPosts: [],
            pastPosts: []
        }
    });

    // Function to update user profile 
    const updateUser = (updatedUser) => {
        setUser(updatedUser);
    };

    return (
        <UserProfileContext.Provider value={{ user, updateUser }}>
            {children}
        </UserProfileContext.Provider>
    );
}

// Create custom hook
export function useUserProfile() {
    let context = useContext(UserProfileContext);
    if(!context) {
        console.log("No Users found!")
    }
    return context;
}