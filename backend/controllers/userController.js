const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const asyncHandler = require("express-async-handler")
const User = require("../models/User")

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const signupUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body

  if (!userName || !email || !password) {
    res.status(400)
    throw new Error("Please add all fields")
  }

  // Check if user exists
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error("User already exists")
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = await User.create({
    userName,
    email,
    password: hashedPassword,
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      userName: user.userName,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error("Invalid user data")
  }
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Check for user email
  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      userName: user.userName,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error("Invalid credentials")
  }
})

//delete user
const deleteUser = asyncHandler(async (req, res) => {
  if (req.body.userId === req.params.id ) {
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json("Account has been deleted")
  } else if (error) {
    return res.status(500).json(err)
  } else {
    return res.status(403).json("You can delete only your account!")
  }
})

//Update user
const updateUser = asyncHandler(async (req, res) => {
  if (req.body.userId === req.params.id ) {
    if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt)
      if (err) {
        return res.status(500).json(err);
      }
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true,})
      res.status(200).json(updatedUser) 
    }
  else if(err) {
    return res.status(500).json(err)
  }else{
    return res.status(403).json("You can update only your account!")
  }
}})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  })
}

module.exports = {
  signupUser,
  loginUser,
  updateUser,
  deleteUser,
  getMe
}