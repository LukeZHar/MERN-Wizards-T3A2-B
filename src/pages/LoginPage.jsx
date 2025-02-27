import React from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => (
    
    <div> 
        <h2>Login Here</h2>
        <p>Login and aaccess or update your details.</p>
        <nav>
            <Link to="/"> Retrun Home </Link> | <Link to="/add-post"> Create a new Post </Link> | <Link to="/edit-post"> Edit a Post </Link>
        </nav>
    </div>

);

export default LoginPage;