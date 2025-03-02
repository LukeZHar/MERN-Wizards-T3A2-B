import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom'; // Import React Router for navigation
import logo from '../assets/Mern.png';

export default function Header() {
    // const [isOpen, setIsOpen] = useState(false);

    // const toggleMenu = () => {
    //     setIsOpen(!isOpen);
    // };

    return (
        <AppBar position="static" sx={{ bgcolor: '#00cccc' }}>
            <Toolbar>
                {/* Logo section */}
                <img
                    src={logo}
                    alt="MERN Logo"
                    style={{ width: '50px', marginRight: '16px' }} // Adjust according to desired logo size
                />
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    A Ticket a Task It
                </Typography>
                <Button color="inherit" component={Link} to="/login">Login</Button>
                <Button color="inherit" component={Link} to="/register">Register</Button>
            </Toolbar>
        </AppBar>
    );
};