import react from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/login.css";

export default function LoginPage() {
    return(
        <div className="login-page">
            <Header />
            <main>
                <h2>Login</h2>
                <form>
                    <input type="text" name="username" placeholder="Username" required />
                    <input type="password" name="password" placeholder="Password" required />
                    <button type="submit">Login</button>
                    <button type="google">Login with Google</button>
                    <p>Don't have an account? <a href="/register">Register</a></p>
                </form>
            </main>
            <Footer />
        </div>
    )
}