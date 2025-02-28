import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => (
    
    <div> 
        <h2>Welcome to A Ticket A Task-it</h2>
       <nav>
            <Link to="/login"> Login</Link> | <Link to="/post"> Post</Link> | <Link to="/register"> New Registration</Link>
        </nav>
    </div>

);

export default Home;
