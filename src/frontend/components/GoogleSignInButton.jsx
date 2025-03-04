import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const GoogleSignInButton = () => {
    const responseGoogle = (response) => {
        const idToken = response.credential; // Get the ID token from the response
        console.log('ID Token:', idToken); // Log the ID token for debugging
            };

    const handleLoginFailure = (error) => {
        console.error("Login failed:", error);
    };

    return (
        <GoogleLogin
            onSuccess={responseGoogle}
            onFailure={handleLoginFailure}
            logo="Your logo or custom rendering if needed" 
        />
    );
};

export default GoogleSignInButton;