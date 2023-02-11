const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    ingredients: {
        type: Array,
        required: true
    },
    instructions: {
        type: Array,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

const Post = mongoose.model("Post", PostSchema)

module.exports = Post