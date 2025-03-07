const { User } = require('../models/UserModel'); // Import the User model
const bcrypt = require("bcrypt");

// Function to get user's profile
async function getUserProfile(req, res) {

    // Conditional check
    if (!req.authUserData || !req.authUserData.userId) {
        return res.status(401).json({ message: "Unauthorized - User ID missing from token" });
    }

    // Extract token from User
    const userId = req.authUserData.userId;
    console.log("Authenticated user ID:", userId); // debug msg

    // Try finding the user profile
    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Send user data (excluding sensitive fields like password)
        res.status(200).json({
            username: user.username,
            email: user.email,
            registrationDate: user.registrationDate,
            userClass: user.userClass,
        });
    } catch (error) {
        console.error("Error fetching user profile", error);
        res.status(500).json({ message: "Error fetching user profile" });
    }
}

// Function to update user
async function updateUserProfile(req, res) {

    // Conditional check
    if (!req.authUserData || !req.authUserData.userId) {
        return res.status(401).json({ message: "Unauthorized - User ID missing from token" });
    }

    // Extract user ID from JWT
    const userId = req.authUserData.userId; 
    console.log("Authenticated user ID:", userId); // debug purposes

    // Fetch username and email from request body
    const { username, email } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update only the fields provided in the request
        if (username) user.username = username;
        if (email) user.email = email;

        await user.save();

        res.status(200).json({
            message: "Profile updated successfully",
            user: {
                username: user.username,
                email: user.email,
                registrationDate: user.registrationDate,
                userClass: user.userClass
            },
        });
    } catch (error) {
        console.error("Error updating user profile:", error);
        res.status(500).json({ message: "Error updating profile" });
    }
}

// Function to update user's password
async function updateUserPassword(req, res) {

    // Conditional check for JWT
    if (!req.authUserData || !req.authUserData.userId) {
        return res.status(401).json({ message: "Unauthorized - User ID missing from token" });
    }

    const userId = req.authUserData.userId;
    console.log("Authentication was successful.");

    // Fetch current and new password from request body
    const { currentPassword, newPassword } = req.body;

    // Conditional check
    if (!currentPassword || !newPassword) {
        return res.status(400).json({ message: "Both current and new password are required." });
    }

    try {
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Validate current password
        const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect current password" });
        }

        // Hash and save new password
        const salt = await bcrypt.genSalt(10);
        user.passwordHash = await bcrypt.hash(newPassword, salt);
        await user.save();

        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error("Error updating password:", error);
        res.status(500).json({ message: "Error updating password" });
    }
}

// Export functions
module.exports = {
    getUserProfile,
    updateUserProfile,
    updateUserPassword
};
