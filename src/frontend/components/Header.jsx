import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, Slide, useScrollTrigger } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'; // Import React Router for navigation
import logo from '../assets/Mern.png';
import { useUserAuthContext } from '../contexts/UserAuthContext';

const HideOnScroll = (props) => {
    const { children } = props;
    const trigger = useScrollTrigger();

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
};

export default function Header() {
    const [anchorElProfile, setAnchorElProfile] = React.useState(null);
    const [anchorElSignIn, setAnchorElSignIn] = React.useState(null);
    const [token, setToken, logout] = useUserAuthContext(); // Get the authentication token from context
    const navigate = useNavigate(); // For navigation after logout

    const handleProfileMenu = (event) => {
        setAnchorElProfile(event.currentTarget);
    };

    const handleSignInMenu = (event) => {
        setAnchorElSignIn(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorElProfile(null);
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
                    <img src={logo} alt="MERN Logo" style={{ width: '50px', marginRight: '16px' }} />
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        A Ticket a Task It
                    </Typography>
                    {token ? (
                        <>
                            <Button color="inherit" onClick={handleProfileMenu}>Profile</Button>
                            <Menu anchorEl={anchorElProfile} open={Boolean(anchorElProfile)} onClose={handleClose}>
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
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