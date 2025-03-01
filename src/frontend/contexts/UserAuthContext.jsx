import { createContext, useContext, useState, useEffect } from "react";

// This context will store the JWT token
const UserAuthContext = createContext("");

// Provider component
export function UserAuthContextProvider({ children }) {
    const [token, setToken] = useState(() => {
        return localStorage.getItem("token") || "";
    });

    // Update token in localStorage whenever it changes
    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }
    }, [token]);

    return (
        <UserAuthContext.Provider value={[token, setToken]}>
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