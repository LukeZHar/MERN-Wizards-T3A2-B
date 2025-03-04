import axios from 'axios';

const API_URL = import.meta.env.VITE_AUTH_API_URL

// Function to create a new notification
export const createNotification = async (recipientID, relatedPostID, message) => {
    try {
        const response = await axios.post(`${API_URL}/api/notifications`, { recipientID, relatedPostID, message });
        return response.data; // Return the created notification
    } catch (error) {
        console.error("Error creating notification:", error);
        throw new Error("Failed to create notification");
    }
};

// Function to fetch notifications for a specific user
export async function getUserNotifications(userId) {
    console.log('User ID:', userId); // Log the userId
    if (!userId) {
        console.error('User ID is undefined.');
        return; // Exit early if userId is undefined
    }

    try {
        const response = await axios.get(`${API_URL}/api/notifications/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching notifications:', error);
        throw new Error('Failed to fetch notifications');
    }
}

// Function to mark a notification as read
export const markNotificationAsRead = async (notificationId) => {
    try {
        const response = await axios.patch(`${API_URL}/api/notifications/read/${notificationId}`);
        return response.data; // Return the updated notification
    } catch (error) {
        console.error("Error marking notification as read:", error);
        throw new Error("Failed to mark notification as read");
    }
};

// Function to delete a notification
export const deleteNotification = async (notificationId) => {
    try {
        const response = await axios.delete(`${API_URL}/api/notifications/${notificationId}`);
        return response.data; // Return a confirmation message
    } catch (error) {
        console.error("Error deleting notification:", error);
        throw new Error("Failed to delete notification");
    }
};