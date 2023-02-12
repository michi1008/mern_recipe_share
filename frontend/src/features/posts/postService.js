import axios from "axios"

const API_URL = "/api/posts/"

// Create new post
const createPost = async (postData, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.post(API_URL, postData, config)
    console.log(response.data)
    return response.data
  }
  
  // Get user posts
  const getPosts = async () => {
  
    const response = await axios.get(API_URL)
  
    return response.data
  }
  
  // Get post by ID
  const getPost = async (postId) => {
    const response = await axios.get(API_URL + postId)
    return response.data
  }

  // Get my posts
  const getPostsByUser = async (userId, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await axios.get(API_URL + "userPosts/" + userId, config)
    console.log(response.data)
    return response.data
  }

  // Delete user post
  const deletePost = async (postId, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await axios.delete(API_URL + postId, config)
    console.log(response.data)
    return response.data 
  }
  
  // Update user post
  const updatePost = async ({id, updatePostData}, token) => {
    
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await axios.put(API_URL + "userPosts/" + id + "/edit", updatePostData, config)
    return response.data
  }
  
  const postService = {
    createPost,
    getPosts,
    getPost,
    getPostsByUser,
    deletePost,
    updatePost,
  }
  
  export default postService