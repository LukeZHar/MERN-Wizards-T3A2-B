import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import PostCreation from "./PostCreation.jsx";
import NotFoundPage from "./NotFoundPage.jsx";
import { PostProvider } from "../contexts/PostContext.jsx";
import DashboardPage from "./DashboardPage.jsx";
import Layout from "../components/Layout.jsx";
import { Box } from "@mui/material";
import NavBar from "../components/NavBar.jsx";

// Component to wrap pages with conditional NavBar
const LayoutWithNav = ({ children }) => {
  const location = useLocation(); // Get current route

  // Define paths where NavBar should be hidden
  const hideNavBar = ["/", "/login", "/register"].includes(location.pathname);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {!hideNavBar && <NavBar />} {/* Show NavBar only if NOT on login/register */}
      <Box sx={{ flexGrow: 1 }}>
        <Layout>{children}</Layout> {/* Layout wraps the content properly */}
      </Box>
    </Box>
  );
};

function App() {
  return (
    <PostProvider>
      <Router>
        <LayoutWithNav>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/add-post" element={<PostCreation />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </LayoutWithNav>
      </Router>
    </PostProvider>
  );
}

export default App;
