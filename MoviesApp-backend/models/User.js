const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        min: 8,
        max: 20,
        required: true
    },
    favorites: {
        type: [
            {
                type: Object 
            }
        ],
        default: [],
        required: false
    },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;