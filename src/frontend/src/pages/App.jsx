import '../styles/App.css'
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { PostProvider } from '../contexts/PostContext.jsx';
import { UserProfileProvider } from '../contexts/UserProfileContext.jsx';
import UserProfile from './UserProfile.jsx';
import PostCreation from './PostCreation.jsx';

function App() {
  return (
    <UserProfileProvider>
      <PostProvider>
        <Router>
          <Routes>
            <Route path='/add-post' element={<PostCreation />} />
            <Route path='/user-profile' element={<UserProfile />} />
          </Routes>
        </Router>
      </PostProvider>
    </UserProfileProvider>
  )
}

export default App
