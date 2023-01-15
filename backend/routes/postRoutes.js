const router = require("express").Router();
const Post = require("../models/Post");
const {
    getPosts,
    createPost,
    getPost,
    getPostsByUser,
    updatePost,
    deletePost,
} = require("../controllers/postController")
const { protect } =require("../middleware/authMiddleware")

router.route("/").get(getPosts).post(protect, createPost)
router.route("/:id").delete(protect, deletePost).get(getPost).get(protect, getPostsByUser)
router.route("/userPosts/:id").get(protect, getPostsByUser)
router.route("/userPosts/:id/edit").put(protect, updatePost)
router.route("/user")
module.exports = router