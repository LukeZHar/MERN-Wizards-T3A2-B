import React from 'react';
import { Link } from 'react-router-dom';

const RegisterPage = () => (
    
    <div> 
        <h2>Register Here</h2>
        <p>Create a new user request.</p>
        <nav>
            <Link to="/"> Retrun Home </Link> | <Link to="/add-post"> Create a new Post </Link> | <Link to="/edit-post"> Edit a Post </Link>
        </nav>
    </div>

);

export default RegisterPage;