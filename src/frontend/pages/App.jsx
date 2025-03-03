import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import PostCreation from "./PostCreation.jsx";
import NotFoundPage from "./NotFoundPage.jsx";
import { PostProvider } from "../contexts/PostContext.jsx";
import DashboardPage from "./DashboardPage.jsx";
import Layout from "../components/Layout.jsx";
import "../styles/App.css"

function App() {
  return (
    <PostProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/add-post" element={<PostCreation />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </Router>
    </PostProvider>
  );
}

export default App;
