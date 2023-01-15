import axios from "axios"

const API_URL = "/api/users/"

// Register user
const signup = async (userData) => {
  const response = await axios.post(API_URL, userData)

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data))
  }

  return response.data
}

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData)

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data))
  }

  return response.data
}

// Update user
const updateUser = async (updateUser, token) => {
  const {userId} = updateUser
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.patch(API_URL + userId + "/update", updateUser, config)

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data))
  }

  return response.data
}

// Logout user
const logout = () => {
  localStorage.removeItem("user")
}

const authService = {
  signup,
  updateUser,
  logout,
  login,
}

export default authService