const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Post = new Schema({
    title: {
        type: String,
        require: true
    },
    desc: {
        type: String,
        require: true
    },
    status: {
        type: String,
        enum: ['TO LEARN', 'LEARNING', 'LEARNED']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "user"
    }
});

module.exports = mongoose.model("post", Post); 