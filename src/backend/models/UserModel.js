const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    }
});

const UserModel = mongoose.model('User', userSchema);

module.exports = {
    UserModel
};