import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    Button,
    List,
    ListItem,
    ListItemText,
    Alert
} from '@mui/material';

export default function Notification({ notifications, onMarkAsRead }) {
    if (notifications.length === 0) {
        return <Alert severity="info">No notifications available.</Alert>; // Message when no notifications exist
    }

    return (
        <div className="notification-container">
            <Typography variant="h5" gutterBottom>
                Notifications
            </Typography>
            <List sx={{ width: '100%', bgcolor: '#00cccc' }}> {/* Style the list */}
                {notifications.map((notification) => (
                    <ListItem key={notification._id} divider>
                        <ListItemText
                            primary={notification.message}
                            secondary={notification.creationDate ? new Date(notification.creationDate).toLocaleString() : null} // Format date
                        />
                        <Button onClick={() => onMarkAsRead(notification._id)} variant="outlined" size="small">
                            Mark as Read
                        </Button>
                    </ListItem>
                ))}
            </List>
        </div>
    );
}