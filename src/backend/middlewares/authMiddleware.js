const jwt = require("jsonwebtoken");

// Middleware to validate a JWT token
async function validateToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Authorization header missing" }); // If there's no auth header, respond with 401 Unauthorised
    }

    // Split the header to get the token
    const token = authHeader.split(" ")[1]; // Remove "Bearer " prefix

    try {
        // Verify the token using the secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.authUserData = decoded; // Attach user data to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(403).json({ message: "Token validation failed", error }); // If token verification fails, respond with 403 Forbidden
    }
}

module.exports = {
    validateToken
};