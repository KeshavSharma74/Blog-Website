import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
axios.defaults.withCredentials = true;

// Create post (admin only) - expects FormData with fields and files
export const createPost = createAsyncThunk(
  "post/createPost",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API_URL}/api/post/create`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true }
      );
      return res.data.post;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to create post");
    }
  }
);

// Update post (admin only) - FormData optional for image changes
export const updatePost = createAsyncThunk(
  "post/updatePost",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(
        `${API_URL}/api/post/update/${id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true }
      );
      return res.data.post;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update post");
    }
  }
);

// Delete post (admin only)
export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/api/post/delete/${id}`, { withCredentials: true });
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to delete post");
    }
  }
);

// Get all posts
export const getAllPosts = createAsyncThunk(
  "user/getAllPosts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/api/user/get-all-post`);
      return res.data.posts;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch posts");
    }
  }
);

// Get single post by id
export const getPostBySlug = createAsyncThunk(
  "post/getPostBySlug",
  async (slug, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/api/post/get-post/${slug}`);
      return res.data.post;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch post");
    }
  }
);

// Get similar posts by category based on current post id
export const getSimilarPosts = createAsyncThunk(
  "post/getSimilarPosts",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/api/post/get-similar-post/${id}`);
      return res.data.posts;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch similar posts");
    }
  }
);

const initialState = {
  currentPost: null,
  allPosts: [],
  similarPosts: [],
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  isFetching: false,
  isFetchingAll: false,
  error: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    clearPostState(state) {
      state.currentPost = null;
      state.allPosts = [];
      state.similarPosts = [];
      state.isCreating = false;
      state.isUpdating = false;
      state.isDeleting = false;
      state.isFetching = false;
      state.isFetchingAll = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // create
      .addCase(createPost.pending, (state) => {
        state.isCreating = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isCreating = false;
        state.currentPost = action.payload;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isCreating = false;
        state.error = action.payload;
      })

      // update
      .addCase(updatePost.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.currentPost = action.payload;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.payload;
      })

      // delete
      .addCase(deletePost.pending, (state) => {
        state.isDeleting = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, _action) => {
        state.isDeleting = false;
        state.currentPost = null;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isDeleting = false;
        state.error = action.payload;
      })

      // get by slug
      .addCase(getPostBySlug.pending, (state) => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(getPostBySlug.fulfilled, (state, action) => {
        state.isFetching = false;
        state.currentPost = action.payload;
      })
      .addCase(getPostBySlug.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload;
      })

      // get all posts
      .addCase(getAllPosts.pending, (state) => {
        state.isFetchingAll = true;
        state.error = null;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.isFetchingAll = false;
        state.allPosts = action.payload || [];
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.isFetchingAll = false;
        state.error = action.payload;
      })

      // similar
      .addCase(getSimilarPosts.fulfilled, (state, action) => {
        state.similarPosts = action.payload || [];
      });
  },
});

export const { clearPostState } = postSlice.actions;
export default postSlice.reducer;