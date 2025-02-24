const jwt = require("jsonwebtoken");

async function validateToken (req, res, next) {

    const token = req.headers.jwt;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.authUserData = decoded;

    next();
}

module.exports = { 
    validateToken 
};