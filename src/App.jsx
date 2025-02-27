import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PostDetails from './pages/PostDetails';
import PostCreation from './pages/PostCreation';
import PostEdit from './pages/PostEdit';


function App() {
  return (
    
      <Router>
        <div>
          <h1>A Ticket A Task-it</h1>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} /> 
            <Route path="/register" element={<RegisterPage />} /> 
            <Route path="/post" element={<PostDetails />} />
            <Route path="/add-post" element={<PostCreation />} />
            <Route path="/edit-post" element={<PostEdit />} />
          </Routes>
        </div>
      </Router>
      );
};

export default App;