const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [ isEmail, 'Please enter a valid email' ]
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters']
    },
});

/* mongoose hooks */

// hashing the password before saving to db
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// // fire a function after doc saved to db
// userSchema.post('save', function (doc, next) {
//     console.log('new user created & saved', doc);
//     next();
// });

// // fire a function before doc saved to db
// userSchema.pre('save', function (next) {
//     console.log('user about to be created & saved', this);
//     next();
// });

// creating a Model using the Collection name (singular) as first argument and Schema as the second argument
const User = mongoose.model('user', userSchema);

module.exports = User;