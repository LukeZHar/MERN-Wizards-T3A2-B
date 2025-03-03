import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home.jsx';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import PostCreation from './PostCreation.jsx';
import NotFoundPage from './NotFoundPage.jsx'; //  Not Found page for undefined routes
import { PostProvider } from '../contexts/PostContext.jsx';
import '../styles/App.css';
import DashboardPage from './DashboardPage.jsx';
import Layout from '../components/Layout.jsx';


function App() {
  return (
    <PostProvider>
      <Router>
        <Layout>
          <div>
            <Routes>
              <Route path="/" element={<Home />} /> {/* Default route Home */}
              <Route path="/login" element={<LoginPage />} /> {/* Login route */}
              <Route path="/register" element={<RegisterPage />} /> {/* Registration route */}
              <Route path="/add-post" element={<PostCreation />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="*" element={<NotFoundPage />} />       {/* Catch-all route for 404 pages */}
            </Routes>
          </div>
        </Layout>
      </Router>
    </PostProvider>
  );
}

export default App;