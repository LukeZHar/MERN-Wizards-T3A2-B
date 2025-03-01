import { useState } from "react";
import axios from 'axios';
import "../styles/login.css"; // Import your CSS styles
import { useUserAuthContext } from "../contexts/UserAuthContext"; // Import custom AuthContext

export default function LoginPage() {
    // State variables for storing login input and error messages
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [token, setToken] = useUserAuthContext(); // Access token state from context

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        const userDetails = { username, password }; // Capture username and password
        try {
            // Send login request to the backend API
            const response = await axios.post(`${import.meta.env.VITE_AUTH_API_URL}/api/auth/login`, { userDetails });
            // localStorage.setItem('token', response.data.token); // Store JWT token in localStorage 
            setToken(response.data.token); // Set the token in context
            alert('Login successful!'); // Alert on successful login
            setError(''); // Clear any previous error
        } catch (err) {
            // Set error message to display if login fails
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="login-page">
            <main>
                <h2>Welcome</h2>
                <p>Please enter your details to continue</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text" // Use text input for username
                        name="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} // Update username state
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // Update password state
                        required
                    />
                    <button type="submit">Login</button>
                    <button type="button">Login with Google</button>
                    <p>Don't have an account? <a href="/register">Register</a></p>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </form>
            </main>
        </div>
    );
}