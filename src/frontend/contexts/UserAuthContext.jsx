import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";  // decode token

// This context will store the JWT token
const UserAuthContext = createContext("");

// Provider component
export function UserAuthContextProvider({ children }) {
    const [token, setToken] = useState(() => { return localStorage.getItem("token") || ""; });
    const [userId, setUserId] = useState(null);
    const [userClass, setUserClass] = useState(null);

    // Update token in localStorage whenever it changes
    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
            decodeToken(token); // call decode fn
        } else {
            localStorage.removeItem("token");
            setUserId(null);
            setUserClass(null);
        }
    }, [token]);

    const logout = () => {
        setToken(''); // Clear the token
        setUserId(null);
        setUserClass(null);
    };

    // Function to decode token and extract user Id and Class
    const decodeToken = (token) => {
        try {
            if (token) {
                const decoded = jwtDecode(token);
                setUserId(decoded.userId || null);
                setUserClass(decoded.userClass || null);
            } else {
                setUserId(null);
                setUserClass(null);
            }
        } catch (error) {
            console.error("Error decoding token:", error);
            setUserId(null);
            setUserClass(null);
        }
    };

    return (
        <UserAuthContext.Provider value={[token, setToken, logout, userId, userClass]}>
            {children}
        </UserAuthContext.Provider>
    );
}

// Custom hook for accessing the auth context
export function useUserAuthContext() {
    const context = useContext(UserAuthContext);
    if (context === undefined) {
        throw new Error('useUserAuthContext must be used within a UserAuthContextProvider');
    }
    return context;
}