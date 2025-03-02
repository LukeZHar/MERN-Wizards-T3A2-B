import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import PostCreation from './PostCreation.jsx';
import NotFoundPage from './NotFoundPage.jsx'; //  Not Found page for undefined routes
import Header from '../components/Header.jsx'; //  Header component
import Footer from '../components/Footer.jsx'; //  Footer component
import { PostProvider } from '../contexts/PostContext.jsx';
import { UserAuthContextProvider } from '../contexts/UserAuthContext.jsx'; // Authentication context provider
import '../styles/App.css';

function App() {
  return (
    <UserAuthContextProvider>
      <PostProvider>
        <Router>
          <Header />
          <div>
            <Routes>
              <Route path="/" element={<LoginPage />} /> {/* Default route redirects to Login */}
              <Route path="/login" element={<LoginPage />} /> {/* Login route */}
              <Route path="/register" element={<RegisterPage />} /> {/* Registration route */}
              <Route path='/add-post' element={<PostCreation />} />

              <Route path="*" element={<NotFoundPage />} />       {/* Catch-all route for 404 pages */}
            </Routes>
          </div>
          <Footer />
        </Router>
      </PostProvider>
    </UserAuthContextProvider>
  );
}

export default App;