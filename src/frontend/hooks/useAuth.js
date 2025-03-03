import { useUserAuthContext } from "../contexts/UserAuthContext";

const useAuth = () => {
    const [token, setToken] = useUserAuthContext(); // Access token and setter from context

    const login = (newToken) => {
        setToken(newToken); // Set the user token in the context
    };

    const logout = () => {
        setToken(''); // Clear the user token in context
        localStorage.removeItem('token'); // Also remove it from localStorage
    };

    const isLoggedIn = () => {
        return !!token; // Check if the user is logged in
    };

    return {
        token,
        login,
        logout,
        isLoggedIn,
    };
};

export default useAuth;