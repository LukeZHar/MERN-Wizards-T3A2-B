import { createContext, useContext, useState } from "react";

// Create an instance of Context
const AvatarContext = createContext();

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
        <ProfileProvider value={{profileImage, setProfileImage, updateProfileImage}}>
            {children}
        </ProfileProvider>
    );
};

// // Create custom hook
export function useProfileImg() {
    let context = useContext(ProfileProvider);
    if(!context) {
        console.log("No Profile avatars found!");
    }
    return context;
}