
const mongoose  = require("mongoose")
const Post = require("../models/Post")
const User = require("../models/User")
const cloudinary = require("../utils/cloudinary")

const createPost = async (req, res) => {
  const {title, desc, ingredients, instructions, image} = req.body
  const result = await cloudinary.uploader.upload(image, {
    folder: "posts",
  })
  if (!title || !desc || !image || !ingredients || !instructions) {
    res.status(400)
    throw new Error('Please add all the values')
  }

  const post = await Post.create({
    title,
    desc,
    image: {
      public_id: result.public_id,
      url: result.secure_url
    },
    ingredients,
    instructions,
    user: req.user.id,
  })

  res.status(200).json(post)
}

const getPosts = async (req, res) => {
 
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

const getPostsByUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "User doesn't exist" });
  }
  const userPosts = await Post.find({ user:req.user.id });  
  res.status(200).json(userPosts);
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(req.params.id);
  const imgId = post.image.public_id
  if( imgId) {
    await cloudinary.uploader.destroy(imgId);
  }
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No recipe exist with id: ${id}` });
    }
    await Post.findByIdAndRemove(id);
    res.json({ message: "Recipe deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const currentPost = await Post.findById(req.params.id)

  const updatedPost = {
    creator: req.body.creator,
    title: req.body.title,
    desc: req.body.desc,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
  }
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No post exist with id: ${id}` });
    }
  const ImgId = currentPost.image.public_id
  if(ImgId){
    await cloudinary.uploader.destroy(ImgId)
  }
const newImage = await cloudinary.uploader.upload(req.body.image, {
  folder: "posts",
})

updatedPost.image = {
  public_id: newImage.pulic_id,
  url: newImage.secure_url
}
await Post.findByIdAndUpdate(id, updatedPost, { new: true });
  res.json(updatedPost);
} catch (error) {
  res.status(404).json({ message: "Something went wrong" });
}
};

module.exports = {
  createPost,
  getPosts,
  getPost,
  getPostsByUser,
  deletePost,
  updatePost,
}