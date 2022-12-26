const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createTime: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('user', User);