const { Notification } = require('../models/NotificationModel'); // Import Notification model
const { User } = require('../models/UserModel'); // Import User model if you need to get user details

// Create a new notification
async function createNotification(req, res) {
    const { recipientID, relatedPostID, message } = req.body; // Destructure from request body

    try {
        const notification = new Notification({
            recipientID,
            relatedPostID,
            message
        });

        await notification.save(); // Save the notification to the database
        res.status(201).json({ message: "Notification created successfully", notification });
    } catch (error) {
        console.error("Error creating notification:", error);
        res.status(500).json({ message: "Error creating notification" });
    }
}

// Get all notifications for a specific user
async function getUserNotifications(req, res) {
    const userId = req.params.userId; // Get user ID from request parameters

    try {
        const notifications = await Notification.find({ recipientID: userId })
            .populate('relatedPostID') // Populate related post details if necessary
            .exec();

        res.status(200).json(notifications); // Send notifications list
    } catch (error) {
        console.error("Error fetching notifications:", error);
        res.status(500).json({ message: "Error fetching notifications" });
    }
}

// Notify users when a new post is created
async function notifyOnNewPost(userId, postId) {
    const message = "A new post has been created.";
    try {
        await createNotification({
            recipientID: userId,
            relatedPostID: postId,
            message,
        });
    } catch (error) {
        console.error("Error notifying on new post:", error);
    }
}

// Notify users when someone replies to a post
async function notifyOnReply(userId, postId) {
    const message = "Someone replied to your post.";
    try {
        await createNotification({
            recipientID: userId,
            relatedPostID: postId,
            message,
        });
    } catch (error) {
        console.error("Error notifying on reply:", error);
    }
}

// Mark a notification as read
async function markAsRead(req, res) {
    const notificationId = req.params.id; // Get notification ID from request parameters

    try {
        const notification = await Notification.findByIdAndUpdate(notificationId, { isRead: true }, { new: true });
        if (!notification) {
            return res.status(404).json({ message: "Notification not found" });
        }

        res.status(200).json({ message: "Notification marked as read", notification });
    } catch (error) {
        console.error("Error marking notification as read:", error);
        res.status(500).json({ message: "Error marking notification as read" });
    }
}

// Delete a notification
async function deleteNotification(req, res) {
    const notificationId = req.params.id; // Get notification ID from request parameters
    
    try {
        const notification = await Notification.findByIdAndDelete(notificationId);
        if (!notification) {
            return res.status(404).json({ message: "Notification not found" });
        }

        res.status(200).json({ message: "Notification deleted successfully" });
    } catch (error) {
        console.error("Error deleting notification:", error);
        res.status(500).json({ message: "Error deleting notification" });
    }
}

// Export functions
module.exports = {
    createNotification,
    getUserNotifications,
    markAsRead,
    deleteNotification,
    notifyOnNewPost, 
    notifyOnReply
};