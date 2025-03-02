const express = require('express');
const {
    createNotification,
    getUserNotifications,
    markAsRead,
    deleteNotification
} = require('../controllers/notificationController');

const router = express.Router();

// POST /api/notifications - Create a new notification
router.post('/', createNotification);

// GET /api/notifications/:userId - Retrieve all notifications for a specific user
router.get('/:userId', getUserNotifications);

// PATCH /api/notifications/read/:id - Mark a notification as read
router.patch('/read/:id', markAsRead);

// DELETE /api/notifications/:id - Delete a notification
router.delete('/:id', deleteNotification);

module.exports = router; // Export the router to be used in the server