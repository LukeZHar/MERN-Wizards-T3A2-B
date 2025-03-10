const User = require("../models/UserModel");

// Middleware to check if user is an Admin
async function isAdmin(req, res, next) {
    try {
        // Ensure authUserData exists 
        if (!req.authUserData || !req.authUserData.userId) {
            return res.status(401).json({ message: "Unauthorized. No user data found." });
        }

        // Fetch user from database
        const user = await User.findById(req.authUserData.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Check if userClass is "Admin"
        if (user.userClass !== "Admin") {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        // User is admin, proceed to next middleware
        req.adminUser = user;
        next();
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

module.exports = { isAdmin };
