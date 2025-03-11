const { User } = require("../models/UserModel");

// Middleware to check if the user is an Admin
async function isAdmin(req, res, next) {
    try {
        const { id } = req.params;

        // Fetch user by ID from params
        const user = await User.findById(id);
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if userClass is "Admin"
        if (user.userClass !== "Admin") {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        next();
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

module.exports = { isAdmin };
