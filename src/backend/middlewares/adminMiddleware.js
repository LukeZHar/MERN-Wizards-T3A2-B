const { User } = require("../models/UserModel");

async function isAdmin(req, res, next) {
    try {
        if (!req.authUserData || !req.authUserData.userId) {
            return res.status(401).json({ message: "Unauthorized. No user data found." });
        }

        // Fetch the user from the database
        const adminUser = await User.findById(req.authUserData.userId);
        if (!adminUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Ensure the user is an admin
        if (adminUser.userClass !== "Admin") {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        req.adminUser = adminUser; 
        next(); 
    } catch (error) {
        console.error("Error in isAdmin middleware:", error);
        res.status(error.status || 500).json({ message: error.message || "Server error" });
    }
}

module.exports = { isAdmin };
