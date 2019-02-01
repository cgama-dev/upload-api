const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    name: {
        type: String
    },
    size: {
        type: Number
    },
    key: {
        type: String
    },
    url: {
        type: String
    },
    createAt:{
        type: Date,
        default: Date.now
    }
})

const PostModel = mongoose.model('Post', PostSchema)

module.exports = PostModel