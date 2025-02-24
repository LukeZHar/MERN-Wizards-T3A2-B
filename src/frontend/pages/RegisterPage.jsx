import react from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function RegisterPage() {
    return (
        <div className="register-page">
            <Header />
            <main>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit">Register</button>
            </form>
            </main>
            <Footer />
        </div>
    )
}