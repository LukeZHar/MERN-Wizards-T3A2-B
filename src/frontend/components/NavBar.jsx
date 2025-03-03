import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, AppBar, Toolbar, IconButton, Typography, Box, Divider, Button } from "@mui/material";
import { Menu as MenuIcon, Home, AddBox, Notifications, Person, ExitToApp, Dashboard } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";

// NavBar items
const menuItems = [
  { name: "Home", icon: <Home />, path: "/" },
  { name: "Create Post", icon: <AddBox />, path: "/add-post" },
  { name: "Dashboard", icon: <Dashboard />, path: "/dashboard" },
  { name: "Notifications", icon: <Notifications />, path: "/notifications" },
  { name: "Profile", icon: <Person />, path: "/profile" }
];

const NavBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)"); // Detects mobile view
  const navigate = useNavigate(); // Used for redirecting after logout

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear authentication token
    navigate("/login"); // Redirect to login page
  };

  const drawerContent = (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <List sx={{ flexGrow: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton component={Link} to={item.path} onClick={() => setMobileOpen(false)}>
              <ListItemIcon sx={{ color: "ivory" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />

      {/* Logout Button at the Bottom */}
      <Box sx={{ padding: "10px", textAlign: "center" }}>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          startIcon={<ExitToApp />}
          onClick={handleLogout}
          sx={{
            backgroundColor: "ivory",
            color: "#00CCCC",
            "&:hover": { backgroundColor: "#f8f9fa" }
          }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Mobile AppBar (Hamburger Menu) */}
      {isMobile && (
        <AppBar position="fixed" sx={{ backgroundColor: "#00CCCC", zIndex: 1301 }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              A-Ticket-A-Task-It
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      {/* Sidebar for desktop & tablets */}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={toggleDrawer}
        sx={{
          width: isMobile ? "auto" : 200,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: isMobile ? "auto" : 200,
            backgroundColor: "#00CCCC",
            color: "white",
            borderRight: "2px solid #008b8b",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Push content down when AppBar is present */}
      <Box sx={{ marginTop: isMobile ? "64px" : 0, marginLeft: isMobile ? 0 : "200px", padding: "20px" }}>
        <Toolbar /> {/* Keeps spacing when AppBar is present */}
      </Box>
    </>
  );
};

export default NavBar;
