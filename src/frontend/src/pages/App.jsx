import '../styles/App.css'
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import PostCreation from './PostCreation.jsx';
import { PostProvider } from '../contexts/PostContext.jsx';

function App() {
  return (
    <PostProvider>
    <Router>
      <Routes>
        <Route path='/add-post' element={<PostCreation /> } />
      </Routes>
    </Router>
    </PostProvider>
  )
}

export default App
