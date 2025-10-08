import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
axios.defaults.withCredentials = true;

/* ----------------- THUNKS ----------------- */

// Create post (admin only)
export const createPost = createAsyncThunk(
  "post/createPost",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/api/post/create`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (!res.data.success) {
        return rejectWithValue(res.data.message || "Authorization failed");
      }

      return res.data.post;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to create post");
    }
  }
);

// Update post (admin only)
export const updatePost = createAsyncThunk(
  "post/updatePost",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`${API_URL}/api/post/update/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (!res.data.success) {
        return rejectWithValue(res.data.message || "Authorization failed");
      }

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
      const res = await axios.delete(`${API_URL}/api/post/delete/${id}`, {
        withCredentials: true,
      });

      if (!res.data.success) {
        return rejectWithValue(res.data.message || "Authorization failed");
      }

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

      if (!res.data.success) {
        return rejectWithValue(res.data.message || "Failed to fetch posts");
      }

      return res.data.posts;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch posts");
    }
  }
);

// Get single post by slug
export const getPostBySlug = createAsyncThunk(
  "post/getPostBySlug",
  async (slug, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/api/post/get-post/${slug}`);

      if (!res.data.success) {
        return rejectWithValue(res.data.message || "Post not found");
      }

      return res.data.post;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch post");
    }
  }
);

// Get similar posts
export const getSimilarPosts = createAsyncThunk(
  "post/getSimilarPosts",
  async (slug, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/api/post/get-similar-post/${slug}`);

      if (!res.data.success) {
        return rejectWithValue(res.data.message || "Failed to fetch similar posts");
      }

      return res.data.posts;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch similar posts");
    }
  }
);

/* ----------------- SLICE ----------------- */

const initialState = {
  currentPost: null,
  allPosts: [],
  similarPosts: [],
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  isFetching: false,
  isFetchingAll: false,
  isFetchingSimilar: false,
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
      state.isFetchingSimilar = false;
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
      .addCase(deletePost.fulfilled, (state) => {
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
      .addCase(getSimilarPosts.pending, (state) => {
        state.isFetchingSimilar = true;
        state.error = null;
      })
      .addCase(getSimilarPosts.fulfilled, (state, action) => {
        state.isFetchingSimilar = false;
        state.similarPosts = action.payload || [];
      })
      .addCase(getSimilarPosts.rejected, (state, action) => {
        state.isFetchingSimilar = false;
        state.error = action.payload;
      })

      /*  Global matcher: show toast on any reject */
  },
});

export const { clearPostState } = postSlice.actions;
export default postSlice.reducer;
