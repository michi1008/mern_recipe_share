import asyncHandler from "../middleware/asyncHandler.js";
import Post from "../models/Post.js";
import User from "../models/User.js";

// @desc    Create a post
// @route   POST /api/posts
// @access  Private
export const createPost = asyncHandler(async (req, res) => {
  const { title, desc, image, ingredients, instructions, category } = req.body;
  if (!title || !desc || !image || !ingredients || !instructions || !category) {
    res.status(400);
    throw new Error("Please add all the values");
  }

  const post = await Post.create({
    title,
    desc,
    image,
    ingredients,
    instructions,
    category,
    user: req.user._id,
  });

  res.status(201).json(post);
});

// @desc    Fetch all posts
// @route   GET /api/posts
// @access  Public
export const getPosts = asyncHandler(async (req, res) => {
  const { keyword, pageNumber, category, sortBy } = req.query;
  const pageSize = process.env.PAGINATION_LIMIT;
  const page = Number(pageNumber) || 1;

  // Build query conditions based on query parameters
  const query = {};

  if (keyword) {
    query.title = { $regex: keyword, $options: "i" };
  }

  if (category) {
    query.category = category;
  }

  // Apply sorting
  let sort = {};
  if (sortBy) {
    if (sortBy === "nameAZ") {
      sort = { title: 1 }; // Sort by name in ascending order
    } else if (sortBy === "nameZA") {
      sort = { title: -1 };
      // Sort by name in descending order
    }
  }

  const count = await Post.countDocuments(query);
  const posts = await Post.find(query)
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort(sort)
    .populate("user", "userName");
  res.status(200).json({ posts, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch single post
// @route   GET /api/posts/:id
// @access  Public
export const getPostById = asyncHandler(async (req, res) => {
  // NOTE: checking for valid ObjectId to prevent CastError moved to separate
  // middleware.

  const post = await Post.findById(req.params.id).populate("user", "userName");
  if (post) {
    return res.json(post);
  } else {
    // NOTE: this will run if a valid ObjectId but no product was found
    // i.e. product may be null
    res.status(404);
    throw new Error("Post not found");
  }
});

export const getPostsByUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!req.params.id) {
    return res.status(404).json({ message: "User doesn't exist" });
  }
  const userPosts = await Post.find({ user: req.params.id });
  res.status(200).json(userPosts);
});

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private/Admin
export const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post) {
    await post.deleteOne({ _id: post._id });
    res.json({ message: "post removed" });
  } else {
    res.status(404);
    throw new Error("post not found");
  }
});

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private
export const updatePost = asyncHandler(async (req, res) => {
  const { title, image, desc, ingredients, instructions, category } = req.body;

  const post = await Post.findById(req.params.id);
  if (post) {
    post.title = title;
    post.image = image;
    post.desc = desc;
    post.ingredients = ingredients;
    post.instructions = instructions;
    post.category = category;
    const updatedPost = await post.save();
    res.json(updatedPost);
  } else {
    res.status(404);
    throw new Error("post not found");
  }
});

// @desc    Create new comment
// @route   POST /api/posts/:id/comments
// @access  Private
export const createComment = asyncHandler(async (req, res) => {
  const { comment: commentText, parentCommentId } = req.body;
  const post = await Post.findById(req.params.id);

  if (post) {
    const user = await User.findById(req.user._id).select("userName");

    // Check if the comment is a reply or a new comment
    if (parentCommentId) {
      // If it's a reply, find the parent comment and push the reply into its replies array
      const parentComment = post.comments.find(comment => comment._id.toString() === parentCommentId);
      if (parentComment) {
        parentComment.replies.push({
          comment: commentText,
          user: req.user._id,
          userName: user.userName,
        });
      } else {
        res.status(404);
        throw new Error("Parent comment not found");
      }
    } else {
      // If it's a new comment, push it directly into the post's comments array
      post.comments.push({
        comment: commentText,
        user: req.user._id,
        userName: user.userName,
      });
    }

    await post.save();
    res.status(201).json({ message: "Comment added" });
  } else {
    res.status(404);
    throw new Error("Post not found");
  }
});
