const { User } = require('../models/UserModel'); // Import the User model
const bcrypt = require("bcrypt");

// Get User Profile by ID
async function getUserProfile(req, res) {
    const userId = req.params.id; // Extract user ID from request parameters

    try {
        // Retrieve the user by ID
        const user = await User.findById(userId);
        
        // Check if user exists
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Send the user data, but omit sensitive fields (e.g., password)
        res.status(200).json({
            username: user.username,
            email: user.email,
            registrationDate: user.registrationDate,
            userClass: user.userClass,
        });
    } catch (error) {
        console.error(`Error fetching user profile for user ID ${userId}:`, error); // Log error for debugging
        res.status(500).json({ message: "Error fetching user" }); // Send error response
    }
}

async function updateUserProfile(req, res) {
    const userId = req.params.id;
    const { username, email, password } = req.body;

    try {
        // Find the user first
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update username and email
        if (username) user.username = username;
        if (email) user.email = email;

        // If a new password is provided, hash it before saving
        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        // Save the updated user
        await user.save();

        res.status(200).json({
            message: "User updated successfully",
            user: {
            username: user.username,
            email: user.email,
            registrationDate: user.registrationDate,
            userClass: user.userClass
            },
        });
    } catch (error) {
        console.error(`Error updating user profile for user ID ${userId}:`, error);
        res.status(500).json({ message: "Error updating user" });
    }
}

// async function updateUserPassword(req, res) {
//     // const userId = req.params.id; // Extract user ID from request parameters
//     if (!req.authUserData) {
//         console.log("updateUserPassword: req.authUserData is undefined");
//         return res.status(401).json({ message: "Unauthorized" });
//     }
//     const userId = req.authUserData.userId;
    
//     const { currentPassword, newPassword } = req.body;

//     if (!userId) {
//         console.log("updateUserPassword: userId is undefined");
//         return res.status(401).json({ message: "Unauthorized" });
//     }

//     try {
//         console.log(`updateUserPassword: userId = ${userId}`);
//         const user = await User.findById(userId);
//         // Validate and sanitize currentPassword and user.password
//         if (typeof currentPassword !== 'string' || typeof user.password !== 'string') {
//             console.log("updateUserPassword: currentPassword or user.password is not a string");
//             return res.status(400).json({ message: "Invalid password format" });
//         }

//         // Check if the current password is correct
//         const isMatch = await bcrypt.compare(currentPassword, user.password);
//         console.log(`updateUserPassword: currentPassword = ${currentPassword}, isMatch = ${isMatch}`);
//         if (!isMatch) return res.status(400).json({ message: "Incorrect current password" });

//         // Hash the new password
//         const salt = await bcrypt.genSalt(10);
//         user.password = await bcrypt.hash(newPassword, salt);
//         await user.save();

//         res.status(200).json({ message: "Password updated successfully" });
//     } catch (error) {
//         console.error(`Error updating password for user ID ${userId}:`, error);
//         res.status(500).json({ message: "Error updating password" });
//     }
// }

// Export functions
module.exports = {
    getUserProfile,
    updateUserProfile
    // updateUserPassword
};