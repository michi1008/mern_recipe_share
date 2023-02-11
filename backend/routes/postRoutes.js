const router = require("express").Router()

const {
    getPosts,
    createPost,
    getPost,
    getPostsByUser,
    updatePost,
    deletePost,
} = require("../controllers/postController")
const { protect } =require("../middleware/authMiddleware")

/* const multer = require("multer")
const { v4: uuiv4} = require("uuid")

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'images');
  },
  filename: function(req, file, cb) {   
      cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if(allowedFileTypes.includes(file.mimetype)) {
      cb(null, true);
  } else {
      cb(null, false);
  }
}

let upload = multer({ storage, fileFilter }); */

router.route("/").get(getPosts).post(protect, createPost)
router.route("/:id").delete(protect, deletePost).get(getPost).get(protect, getPostsByUser)
router.route("/userPosts/:id").get(protect, getPostsByUser)
router.route("/userPosts/:id/edit").put(protect, updatePost)
router.route("/user")

module.exports = router