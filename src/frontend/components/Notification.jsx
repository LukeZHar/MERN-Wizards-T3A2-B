import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    Button,
    List,
    ListItem,
    ListItemText,
    Alert,
    Box
} from '@mui/material';

export default function Notification({ notifications, onMarkAsRead }) {
    if (notifications.length === 0) {
        return <Alert severity="info">No notifications available. This feature will be implemented in the future.</Alert>; // Message when no notifications exist
    }

    return (
        <Box sx={{ width: '100%', bgcolor: '#00cccc', padding: 2 }}> {/* Main container for notifications */}
            <Typography variant="h5" gutterBottom sx={{ letterSpacing: "1px"}}>
                Notifications
            </Typography>
            <List>
                {notifications.map((notification) => (
                    <ListItem key={notification._id} divider>
                        <ListItemText
                            primary={notification.message} // Display notification message
                            secondary={notification.creationDate ? new Date(notification.creationDate).toLocaleString() : null} // Display formatted creation date
                        />
                        <Button 
                            onClick={() => onMarkAsRead(notification._id)} // Function to mark as read
                            variant="outlined" 
                            size="small"
                        >
                            Mark as Read
                        </Button>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}