const mongoose = require('mongoose');

const Schema = mongoose.Schema

const userSchema = new Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const user = mongoose.model('users', userSchema);

module.exports = user;