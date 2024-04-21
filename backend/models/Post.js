import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
  {
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    userName: { type: String } ,
    parentComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment', 
    },
    replies: [],
  },
  {
    timestamps: true,
  }
);

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  ingredients: {
    type: Array,
    required: true,
  },
  instructions: {
    type: Array,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  comments: [commentSchema],
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Post = mongoose.model("Post", postSchema);

export default Post;
