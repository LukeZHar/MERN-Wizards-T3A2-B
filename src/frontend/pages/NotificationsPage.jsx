import React, { useEffect, useState } from 'react';
import { Container, Typography, Alert } from '@mui/material';
import Notification from '../components/Notification'; // Import your Notification component
import { useUserAuthContext } from '../contexts/UserAuthContext'; 
import { getUserNotifications } from '../services/notificationService'; // Notification fetching service

const NotificationsPage = () => {
    const [notifications, setNotifications] = useState([]); // State for notifications
    const [error, setError] = useState(''); // State for error messages
    const [token, setToken] = useUserAuthContext(); // Get the authentication token and state setter

    const fetchNotifications = async () => {
        if (token) {
            try {
                const userId = localStorage.getItem('userId');
                if (!userId) {
                    console.error("User ID is not available. User might not be logged in.");
                    return;
                }
                const fetchedNotifications = await getUserNotifications(userId);
                setNotifications(fetchedNotifications); // Set notifications in state
            } catch (error) {
                console.error("Failed to fetch notifications:", error);
            }
        }
    };

    useEffect(() => {
        fetchNotifications(); // Fetch notifications on component mount and whenever the token changes
    }, [token]); // Depend on token to refetch when it changes

    return (
        <Container component="main" maxWidth="md" sx={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>Your Notifications</Typography>
            {error && <Alert severity="error">{error}</Alert>} {/* Display any errors */}

            
            <Notification 
                notifications={notifications} 
                onMarkAsRead={(id) => {
                    // Logic to mark the notification as read (this may involve calling an API)
                    // Example: call markAsRead API using the provided id
                    showSnackbar('Notification marked as read!'); 
                }} 
            />
        </Container>
    );
};

export default NotificationsPage;