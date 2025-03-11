const { User } = require("../models/UserModel");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function validateUserInput(username, email, password) {
    const errors = [];

    if (!username) {
        errors.push("Username is required.");
    } else if (username.length < 3) {
        errors.push("Username must be at least 3 characters.");
    }

    if (!email) {
        errors.push("Email is required.");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.push("Email is invalid.");
    }

    if (!password) {
        errors.push("Password is required.");
    } else if (password.length < 6) {
        errors.push("Password must be at least 6 characters long.");
    } else {
        const passwordCondition = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/; // At least one lowercase, one uppercase, one digit
        if (!passwordCondition.test(password)) {
            errors.push("Password must include at least one uppercase letter, one lowercase letter, and one number.");
        }
    }

    return errors;
}

async function registerUser(req, res) {
    const { username, email, password } = req.body;

    // Validate user input
    const validationErrors = validateUserInput(username, email, password);
    if (validationErrors.length) {
        return res.status(400).json({ message: "Validation Error", errors: validationErrors });
    }

    try {
        // Check if username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already in use" });
        }

        // Check if email already exists
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already in use" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create new user
        const user = new User({ username, email, passwordHash: hashedPassword });
        await user.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ errorCode: 'REGISTRATION_FAILED', message: "Error registering user", error });
    }
}

async function loginUser(req, res) {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Incorrect password" });
        }
        
        const token = jwt.sign({ userId: user._id, userClass: user.userClass }, process.env.JWT_SECRET, { expiresIn: "5h" });
        res.status(200).json({ token, user: { id: user._id, userClass: user.userClass } });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ errorCode: 'LOGIN_FAILED', message: "Error logging in", error });
    }
}

module.exports = {
    registerUser,
    loginUser
};