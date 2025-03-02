<<<<<<< HEAD
import react from "react";
import { Link } from 'react-router-dom';
import "../styles/header.css";

export default function Header() {
    // const [isOpen, setIsOpen] = useState(false);

    // const toggleMenu = () => {
    //     setIsOpen(!isOpen);
    // };

    return (
        <header>
            <h1>A Ticket a Task It</h1>
            <nav>
                <ul>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>
                </ul>
            </nav>
        </header>
    )
=======
import react from "react";
import { Link } from 'react-router-dom';
import "../styles/header.css";

export default function Header() {
    // const [isOpen, setIsOpen] = useState(false);

    // const toggleMenu = () => {
    //     setIsOpen(!isOpen);
    // };

    return (
        <header>
            <h1>A Ticket a Task It</h1>
            <nav>
                <ul>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>
                </ul>
            </nav>
        </header>
    )
>>>>>>> d00bea93501d9efa4ba1013cbe2152e3f4853576
}