<<<<<<< Updated upstream
const { User } = require('../models/UserModel'); // Import the User model

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
        console.error("Error fetching user profile:", error); // Log error for debugging
        res.status(500).json({ message: "Error fetching user" }); // Send error response
    }
}

// Update User Profile by ID
async function updateUserProfile(req, res) {
    const userId = req.params.id; // Extract user ID from request parameters
    const { username, email } = req.body; // Get updated data from request body

    try {
        // Find the user and update fields
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { username, email }, // Only updating username and email
            { new: true, runValidators: true } // Return updated document and run validators
        );

        // Check if updatedUser exists
        if (!updatedUser) {
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
        console.error("Error updating user profile:", error); // Log error for debugging
        res.status(500).json({ message: "Error updating user" }); // Send error response
    }
}

// Export functions
module.exports = {
    getUserProfile,
    updateUserProfile,
=======
const { User } = require('../models/UserModel'); // Import the User model

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
        console.error("Error fetching user profile:", error); // Log error for debugging
        res.status(500).json({ message: "Error fetching user" }); // Send error response
    }
}

// Update User Profile by ID
async function updateUserProfile(req, res) {
    const userId = req.params.id; // Extract user ID from request parameters
    const { username, email } = req.body; // Get updated data from request body

    try {
        // Find the user and update fields
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { username, email }, // Only updating username and email
            { new: true, runValidators: true } // Return updated document and run validators
        );

        // Check if updatedUser exists
        if (!updatedUser) {
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
        console.error("Error updating user profile:", error); // Log error for debugging
        res.status(500).json({ message: "Error updating user" }); // Send error response
    }
}

// Export functions
module.exports = {
    getUserProfile,
    updateUserProfile,
>>>>>>> Stashed changes
};