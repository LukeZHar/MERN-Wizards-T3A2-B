const jwt = require("jsonwebtoken");

// Middleware to validate a JWT token
async function validateToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1]; // Remove "Bearer " prefix

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.authUserData = decoded; // Attach user data to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(403).json({ message: "Token validation failed", error });
    }
}

module.exports = {
    validateToken
};