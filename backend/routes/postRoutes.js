const router = require("express").Router()
/* const multer = require('multer')
const path = require("path")

// Set Storage Engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../frontend/public/uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if(allowedFileTypes.includes(file.mimetype)) {
      cb(null, true);
  } else {
      cb(null, false);
  }
}

// Init Upload
const upload = multer({
  storage: storage,
  limits: {
    filesSize: {
      fileSize: 1024 * 1024 * 5,
    },
    fileFilter: fileFilter
  }
}); */

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