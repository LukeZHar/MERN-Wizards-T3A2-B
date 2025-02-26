import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => (
    
    <div> 
        <h2>Welcome to A Ticket A Task-it</h2>
       <nav>
            <Link to="/LoginPage"> Login</Link> | <Link to="/PostDetails"> Post</Link> | <Link to="/RegisterPage"> New Registration</Link>
        </nav>
    </div>

);

export default Home;
