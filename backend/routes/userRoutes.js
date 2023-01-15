const express = require("express")
const router = express.Router()
const {
  signupUser,
  loginUser,
  deleteUser,
  getMe,
  updateUser
} = require("../controllers/userController")
const { protect } = require("../middleware/authMiddleware")

router.post("/", signupUser)
router.post("/login", loginUser)
router.get("/:id", protect, getMe).delete("/:id/delete", protect, deleteUser).patch("/:id/update", protect, updateUser)

module.exports = router