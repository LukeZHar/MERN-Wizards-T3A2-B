import { createContext, useContext, useState } from "react";

// Create an instance of Context
const ProfileContext = createContext();

// Create provider
export const ProfileProvider = ({ children }) => {
    const storedImage = localStorage.getItem("profileImage");
    const [profileImage, setProfileImage] =useState(storedImage || null);

    // Function to update the image
    const updateProfileImage = (image) => {
        setProfileImage(image);
        localStorage.setItem("profileImage", image); // Set Img to Local storage
    };

    return (
        <ProfileContext.Provider value={{profileImage, setProfileImage, updateProfileImage}}>
            {children}
        </ProfileContext.Provider>
    );
};

// // Create custom hook
export function useProfile() {
    let context = useContext(ProfileContext);
    if(!context) {
        console.log("No Profile avatars found!");
    }
    return context;
}