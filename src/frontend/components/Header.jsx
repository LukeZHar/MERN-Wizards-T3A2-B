import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'; // Import React Router for navigation
import logo from '../assets/Mern.png';
import { useUserAuthContext } from '../contexts/UserAuthContext';
import HideOnScroll from './HideOnScroll';
import HomeIcon from '@mui/icons-material/Home'; // Icon for Home
import CreateIcon from '@mui/icons-material/Create'; // Icon for Create Post
import DashboardIcon from '@mui/icons-material/Dashboard'; // Icon for Dashboard
import LogoutIcon from '@mui/icons-material/Logout'; // Icon for Logout
import PersonIcon from '@mui/icons-material/Person'; // Profile icon
import NotificationsIcon from '@mui/icons-material/Notifications'; // Notifications icon
import { getUserNotifications } from '../services/notificationService';

export default function Header() {
    const [anchorElNav, setAnchorElNav] = useState(null);;
    const [anchorElSignIn, setAnchorElSignIn] = React.useState(null);
    const [token, setToken, logout] = useUserAuthContext(); // Get the authentication token from context
    const [anchorElNotifications, setAnchorElNotifications] = useState(null); // State for Notifications Menu
    const [notifications, setNotifications] = useState([]); // State to hold notifications
    const navigate = useNavigate(); // For navigation after logout

    const handleNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleNotificationMenu = (event) => {
        setAnchorElNotifications(event.currentTarget);
        fetchNotifications(); // Fetch notifications when menu is opened
    };

    const handleClose = () => {
        setAnchorElNav(null);
        setAnchorElNotifications(null);
    };

    const handleLogout = () => {
        logout(); // Call the logout function
        handleClose(); // Close the menu
        navigate('/login'); // Redirect to login page
    };

    const fetchNotifications = async () => {
        const userId = localStorage.getItem('userId'); // Retrieve user ID
    
        // Check for userId before proceeding
        if (!userId) {
            console.error("User ID is not available. User might not be logged in.");
            return; // Exit early if no user ID available
        }
    
        try {
            const fetchedNotifications = await getUserNotifications(userId); // Correctly use userId
            setNotifications(fetchedNotifications); // Set notifications in state
        } catch (error) {
            console.error("Failed to fetch notifications:", error);
        }
    };

    // useEffect(() => {
    //     fetchNotifications(); // Fetch notifications on component mount and whenever the token changes
    // }, [token]); // Depend on token to refetch when it changes

    return (
        <HideOnScroll>
            <AppBar position="fixed" sx={{ bgcolor: '#00cccc' }}>
                <Toolbar>
                    <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
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
                            <IconButton onClick={handleNotificationMenu} color="inherit">
                                <NotificationsIcon />
                            </IconButton>
                            <Button color="inherit" onClick={handleNavMenu}>Menu</Button>
                            <Menu anchorEl={anchorElNav} open={Boolean(anchorElNav)} onClose={handleClose}>
                                <MenuItem component={Link} to="/" onClick={handleClose}>
                                    <HomeIcon sx={{ marginRight: 1 }} /> Home
                                </MenuItem>
                                <MenuItem component={Link} to="/dashboard" onClick={handleClose}>
                                    <DashboardIcon sx={{ marginRight: 1 }} /> Dashboard
                                </MenuItem>
                                <MenuItem component={Link} to="/add-post" onClick={handleClose}>
                                    <CreateIcon sx={{ marginRight: 1 }} /> Create Post
                                </MenuItem>
                                <MenuItem component={Link} to="/profile" onClick={handleClose}>
                                    <PersonIcon sx={{ marginRight: 1 }} /> Profile
                                </MenuItem>
                                <MenuItem component={Link} to="/notifications" onClick={handleClose}>
                                    <NotificationsIcon sx={{ marginRight: 1 }} /> Notifications
                                </MenuItem>
                                <MenuItem onClick={handleLogout}>
                                    <LogoutIcon sx={{ marginRight: 1 }} /> Logout
                                </MenuItem>
                            </Menu>
                            <Menu anchorEl={anchorElNotifications} open={Boolean(anchorElNotifications)} onClose={handleClose}>
                                {notifications.length === 0 ? (
                                    <MenuItem onClick={handleClose}>No notifications</MenuItem>
                                ) : (
                                    notifications.map(note => (
                                        <MenuItem key={note._id} onClick={handleClose}>
                                            {note.message}
                                        </MenuItem>
                                    ))
                                )}
                            </Menu>
                        </>
                    ) : null}
                </Toolbar>
            </AppBar>
        </HideOnScroll>
    );
}