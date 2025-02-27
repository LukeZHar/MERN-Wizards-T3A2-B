import React from 'react';
import { Link } from 'react-router-dom';

const RegisterPage = () => (
    
    <div> 
        <h2>Register Here</h2>
        <p>Create a new user request.</p>
        <nav>
            <Link to="/Home"> Retrun Home </Link> | <Link to="/PostCreation"> Create a new Post </Link> | <Link to="/PostEdit"> Edit a Post </Link>
        </nav>
    </div>

);

export default RegisterPage;