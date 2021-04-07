const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
});

// Creating a Model using the Collection name (singular) as first argument and Schema as the second argument
const User = mongoose.model('user', userSchema);

module.exports = User;