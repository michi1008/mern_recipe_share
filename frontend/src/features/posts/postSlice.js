import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import postService from "./postService"

const initialState = {
  posts: [],
  userPosts: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  editId: "",
  message: "",
}

// Create new post
export const createPost = createAsyncThunk(
  "posts/create",
  async (postData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token
      return await postService.createPost(postData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get all posts
export const getPosts = createAsyncThunk(
  "posts/getAll",
  async (_, thunkAPI) => {
    try {
      return await postService.getPosts()
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get post by ID
export const getPost = createAsyncThunk(
  "posts/:id",
  async (id, thunkAPI) => {
    try {
      return await postService.getPost(id)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const getPostsByUser = createAsyncThunk(
  "posts/userPosts/:id",
  async (userId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token
      return await postService.getPostsByUser(userId, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)      
    }
  }
)


// Update user post
export const updatePost = createAsyncThunk(
  "posts/userPosts/:id/edit",
  async ({id, updatePostData}, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token  
      await postService.updatePost({id, updatePostData}, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Delete user post
export const deletePost = createAsyncThunk(
  "posts/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token
      return await postService.deletePost(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)


export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.posts.push(action.payload)
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.posts = action.payload
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getPost.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.post = action.payload
      })
      .addCase(getPost.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getPostsByUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPostsByUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.userPosts = action.payload
      })
      .addCase(getPostsByUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.userPosts = state.userPosts.filter((post) =>
          post._id !== action.payload.id
        )
        state.posts = state.posts.filter((post) =>
          post._id !== action.payload.id
        )
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updatePost.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        const {
          arg: { id },
        } = action.meta;
        if(id){
        state.userPosts = state.userPosts.map((post) =>
          post.id === id ? action.payload : post
        )
        state.posts = state.posts.map((post) =>
          post.id === id ? action.payload : post
        )
        }
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = postSlice.actions
export default postSlice.reducer