import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'; // Import React Router for navigation
import logo from '../assets/Mern.png';
import { useUserAuthContext } from '../contexts/UserAuthContext';
import HideOnScroll from './HideOnScroll';
import HomeIcon from '@mui/icons-material/Home'; // Icon for Home
import CreateIcon from '@mui/icons-material/Create'; // Icon for Create Post
import DashboardIcon from '@mui/icons-material/Dashboard'; // Icon for Dashboard
import LogoutIcon from '@mui/icons-material/Logout'; // Icon for Logout
import PersonIcon from '@mui/icons-material/Person'; // Profile icon

export default function Header() {
    const [anchorElNav, setAnchorElNav] = useState(null);;
    const [anchorElSignIn, setAnchorElSignIn] = React.useState(null);
    const [token, setToken, logout] = useUserAuthContext(); // Get the authentication token from context
    const navigate = useNavigate(); // For navigation after logout

    const handleNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
        setAnchorElSignIn(null);
    };

    const handleSignInMenu = (event) => {
        setAnchorElSignIn(event.currentTarget);
        setAnchorElNav(null);
    };

    const handleClose = () => {
        setAnchorElNav(null);
        setAnchorElSignIn(null);
    };

    const handleLogout = () => {
        logout(); // Call the logout function
        handleClose(); // Close the menu
        navigate('/login'); // Redirect to login page
    };

    return (
        <HideOnScroll>
            <AppBar position="fixed" sx={{ bgcolor: '#00cccc' }}>
                <Toolbar>
                    <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center' }}>
                        <img
                            src={logo}
                            alt="MERN Logo"
                            style={{ width: '50px', marginRight: '16px', borderRadius: '50%' }} // Circular logo
                        />
                    </Link>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        A Ticket a Task It
                    </Typography>
                    {token ? (
                        <>
                            <Button color="inherit" onClick={handleNavMenu}>Menu</Button>
                            <Menu anchorEl={anchorElNav} open={Boolean(anchorElNav)} onClose={handleClose}>
                            <MenuItem component={Link} to="/home" onClick={handleClose}>
                                    <HomeIcon sx={{ marginRight: 1 }} /> Home
                                </MenuItem>
                                <MenuItem component={Link} to="/add-post" onClick={handleClose}>
                                    <CreateIcon sx={{ marginRight: 1 }} /> Create Post
                                </MenuItem>
                                <MenuItem component={Link} to="/dashboard" onClick={handleClose}>
                                    <DashboardIcon sx={{ marginRight: 1 }} /> Dashboard
                                </MenuItem>
                                <MenuItem component={Link} to="/profile" onClick={handleClose}>
                                    <PersonIcon sx={{ marginRight: 1 }} /> Profile
                                </MenuItem>
                                <MenuItem onClick={handleLogout}>
                                    <LogoutIcon sx={{ marginRight: 1 }} /> Logout
                                </MenuItem>
                            </Menu>
                        </>
                    ) : (
                        <>
                            <Button color="inherit" onClick={handleSignInMenu}>Sign In</Button>
                            <Menu anchorEl={anchorElSignIn} open={Boolean(anchorElSignIn)} onClose={handleClose}>
                                <MenuItem component={Link} to="/login" onClick={handleClose}>Login</MenuItem>
                                <MenuItem component={Link} to="/register" onClick={handleClose}>Register</MenuItem>
                            </Menu>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </HideOnScroll>
    );
}