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
        res.status(500).json({ errorCode: "UPDATE_PROFILE_FAILED", message: "Error updating profile" });
    }
}

async function updateUserPassword(req, res) {
    const userId = req.authUserData?.userId;

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized - User ID missing from token" });
    }

    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
        return res.status(400).json({ message: "Both current and new password are required." });
    }

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect current password" });
        }

        const salt = await bcrypt.genSalt(10);
        user.passwordHash = await bcrypt.hash(newPassword, salt);
        await user.save();

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
