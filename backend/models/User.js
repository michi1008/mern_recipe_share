const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        unique: false,
        required: [true, "Can't be blank"],
    },
    email:{
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "Can't be blank"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "is invalid"],
        index: true
    },
    password: {
        type: String,
        required: [true, "can't be blank"],
    },

    posts: [{type: mongoose.Schema.Types.ObjectId, ref: "Post"}],
})


const User = mongoose.model("User", UserSchema);
module.exports = User;