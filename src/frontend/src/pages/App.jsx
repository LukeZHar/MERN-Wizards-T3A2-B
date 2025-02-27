
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import { UserAuthContextProvider } from '../contexts/UserAuthContext';
import PostCreation from './PostCreation.jsx';
import { PostProvider } from '../contexts/PostContext.jsx';

function App() {
  return (
    <UserAuthContextProvider>
      <PostProvider>
        <Router>
          <div>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path='/add-post' element={<PostCreation />} />
            </Routes>
          </div>
        </Router>
      </PostProvider>
    </UserAuthContextProvider >
  );
}

export default App;