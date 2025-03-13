const { User } = require('../models/UserModel');
const bcrypt = require("bcrypt");

// Utility function to validate profile updates
function validateProfileUpdate(username, email, password) {
    const errors = [];
    if (username && username.length < 3) errors.push("Username must be at least 3 characters.");
    if (email && !/\S+@\S+\.\S+/.test(email)) errors.push("Email is invalid.");

    // Check for password complexity (if a password is being updated)
    if (password) {
        const passwordCondition = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/; // At least one lowercase, one uppercase, one digit
        if (password.length < 6 || !passwordCondition.test(password)) {
            errors.push("Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, and one number.");
        }
    }

    return errors;
}

async function getUserProfile(req, res) {
    const userId = req.authUserData?.userId;

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized - User ID missing from token" });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            username: user.username,
            email: user.email,
            registrationDate: user.registrationDate,
            userClass: user.userClass,
        });
    } catch (error) {
        console.error("Error fetching user profile", error);
        res.status(500).json({ errorCode: "FETCH_PROFILE_FAILED", message: "Error fetching user profile" });
    }
}

async function updateUserProfile(req, res) {
    const userId = req.authUserData?.userId;

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized - User ID missing from token" });
    }

    const { username, email } = req.body;
    const validationErrors = validateProfileUpdate(username, email);
    if (validationErrors.length) {
        return res.status(400).json({ message: "Validation Error", errors: validationErrors });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Send the updated user data (omit sensitive data if necessary)
        res.status(200).json({
            message: "User updated successfully",
            user: {
                username: updatedUser.username,
                email: updatedUser.email,
                userClass: updatedUser.userClass,
                registrationDate: updatedUser.registrationDate,
            }
        });
    } catch (error) {
        console.error("Error updating user profile:", error);
        res.status(500).json({ errorCode: "UPDATE_PROFILE_FAILED", message: "Error updating profile" });
    }
}

async function updateUserPassword(req, res) {
    const userId = req.authUserData?.userId;

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized - User ID missing from token" });
    }

    const { currentPassword, newPassword } = req.body;
    
    // Validation errors array
    const errors = [];

    // Validate newPassword
    if (!newPassword) {
        errors.push("Password is required.");
    } else if (newPassword.length < 6) {
        errors.push("Password must be at least 6 characters long.");
    } else {
        const passwordCondition = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/; // At least one lowercase, one uppercase, one digit
        if (!passwordCondition.test(newPassword)) {
            errors.push("Password must include at least one uppercase letter, one lowercase letter, and one number.");
        }
    }

    // If there are validation errors, return them
    if (errors.length > 0) {
        return res.status(400).json({ message: "Validation Error", errors });
    }

    // Check if both passwords are provided
    if (!currentPassword || !newPassword) {
        return res.status(400).json({ message: "Both current and new password are required." });
    }

    try {
        // Find the user in the database
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare current password with stored passwordHash
        const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect current password" });
        }

        // Hash and update the new password
        const salt = await bcrypt.genSalt(10);
        user.passwordHash = await bcrypt.hash(newPassword, salt);
        await user.save();

        console.log("Password updated successfully for user:", userId);

        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error("Error updating password:", error);
        res.status(500).json({ errorCode: "UPDATE_PASSWORD_FAILED", message: "Error updating password" });
    }
}

// Export functions
module.exports = {
    getUserProfile,
    updateUserProfile,
    updateUserPassword
};