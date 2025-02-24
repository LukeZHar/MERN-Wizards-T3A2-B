const express = require("express");
const router = express.Router();

// POST localhost:5000/api/auth/register
router.post("/register", () => {
    console.log("register");
});

// POST localhost:5000/api/auth/login
router.post("/login", (req, res) => {
    res.json({
        "message": "This is the login screen"
    })
});

module.exports = router;
