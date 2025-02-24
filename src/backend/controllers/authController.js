const { User } = require("../models/UserModel");

const bcrypt = require("bcrypt");
const { response } = require("express");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
    // Importing the username and password from the request body
    const { username, password } = req.body;

    // Checking if the username already exists
    const existingUser = await User.findOne({ username });

    // If username already exists send error
    if (existingUser) {
        return res
        .status(400)
        .json({ 
            "message": "Username already exists" 
        });
    }

    // Hashing the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt value

    const user = await User.create({
        username,
        password: hashedPassword
    });

    // Send a acknowledgement response 
    response
    .status(201)
    .json({
        "message": "User created successfully"
    });
}

async function loginUser(req, res) {
    // Importing the username and password from the request body 
    const { username, password } = req.body;

    // Checking if the username already exists
    const user = await User.findOne({ username });

    // If user does not exist send error
    if (!user) {
        return res
        .status(400)
        .json({ 
            "message": "User does not exist" 
        });
    }

    // Checking if the password is correct, compare(password entered by the user, hashed in the database)
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    // If password is incorrect send error
    if (!isPasswordCorrect) {
        return res
        .status(400)
        .json({ 
            "message": "Incorrect password" 
        });
    }

    // Creating a JWT token
    const token = jwt.sign({ userId: user._id }, // Payload data
        process.env.JWT_SECRET, {
        expiresIn: "1h"
    });

    // Send a response with the token
    res
    .status(200)
    .json({
        "token": token
    });
}

module.exports = {
    registerUser,
    loginUser
}