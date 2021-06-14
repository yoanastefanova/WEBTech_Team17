const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: [4, 'User name must be at least 4 characters.'],
        maxlength: [20, 'User name must be less then 20 characters.']
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: (value) => /^\S+@\S+\.\S+$/.test(value),
            message: 'Email must be a valid email address.'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password must be at least 6 characters.'],
        maxlength: [30, 'Password must be less then 30 characters.']
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const User =  mongoose.model('User', UserSchema);

module.exports =  User;