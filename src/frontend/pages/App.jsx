import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import PostCreation from "./PostCreation.jsx";
import NotFoundPage from "./NotFoundPage.jsx";
import DashboardPage from "./DashboardPage.jsx";
import Layout from "../components/Layout.jsx";
import "../styles/App.css"
import NotificationsPage from "./NotificationsPage.jsx";
import Home from "./Home.jsx";
import ProfilePage from "./ProfilePage.jsx";
import AdminPage from "./AdminPage.jsx";

function App() {
  return (
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/add-post" element={<PostCreation />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Layout>
        </Router>
  );
}

export default App;