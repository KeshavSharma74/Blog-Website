import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import uploadFromBuffer from "../utils/cloudinary.js";
import slugify from "slugify";

/**
 * CREATE POST
 */
export const createPost = async (req, res) => {
//   console.log("post create krne agya mei");
  try {
    const userId = req.user._id;
    const { title, subTitle, category, content, contentHTML } = req.body;

    // Validate required fields
    if (!title || !subTitle || !category || !content) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Upload main image
    let mainImageUrl = "";
    if (req.files && req.files['mainImage'] && req.files['mainImage'].length > 0) {
      const result = await uploadFromBuffer(req.files['mainImage'][0].buffer);
      mainImageUrl = result.secure_url;
    } else {
      return res.status(400).json({ success: false, message: "Main image is required" });
    }

    const baseSlug = slugify(title, { lower: true, strict: true });
    let slug = baseSlug;
    // Ensure unique slug by appending a suffix if exists
    let suffix = 1;
    while (await Post.findOne({ slug })) {
      slug = `${baseSlug}-${suffix++}`;
    }

    // Create post document
    const newPost = await Post.create({
      user: userId,
      slug,
      mainImage: mainImageUrl,
      title,
      subTitle,
      category: JSON.parse(category), // CHANGED: Parse the category string into an array
      content: JSON.parse(content),   // frontend sends JSON as string
      contentHTML: contentHTML || "", 
    });

    // Add post reference to user
    await User.findByIdAndUpdate(userId, { $push: { posts: newPost._id } });

    return res.status(201).json({
      success: true,
      message: "Post created successfully",
      post: newPost
    });

  } catch (error) {
    console.error("Create post error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * UPDATE POST
 */
export const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;
    const { title, subTitle, category, content, contentHTML } = req.body;

    // Find post
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ success: false, message: "Post not found" });

    // Check if the logged-in user is the owner
    if (post.user.toString() !== userId.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    // Update main image if new file is uploaded
    if (req.files && req.files['mainImage'] && req.files['mainImage'].length > 0) {
      const result = await uploadFromBuffer(req.files['mainImage'][0].buffer);
      post.mainImage = result.secure_url;
    }

    // Update other fields
    if (title) post.title = title;
    if (subTitle) post.subTitle = subTitle;
    if (category) post.category = JSON.parse(category); // CHANGED: Also fixed here for updates
    if (content) post.content = JSON.parse(content);
    if (contentHTML) post.contentHTML = contentHTML;

    // If title changed, recalculate slug (and ensure uniqueness)
    if (title) {
      const baseSlugUpdate = slugify(title, { lower: true, strict: true });
      let newSlug = baseSlugUpdate;
      let s = 1;
      while (await Post.findOne({ slug: newSlug, _id: { $ne: post._id } })) {
        newSlug = `${baseSlugUpdate}-${s++}`;
      }
      post.slug = newSlug;
    }

    await post.save();

    return res.status(200).json({ success: true, message: "Post updated successfully", post });

  } catch (error) {
    console.error("Update post error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * DELETE POST
 */
export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;

    // Find post
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ success: false, message: "Post not found" });

    // Check ownership
    if (post.user.toString() !== userId.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    // Delete post
    await Post.findByIdAndDelete(postId);

    // Remove post reference from user
    await User.findByIdAndUpdate(userId, { $pull: { posts: postId } });

    return res.status(200).json({ success: true, message: "Post deleted successfully" });

  } catch (error) {
    console.error("Delete post error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getPostBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const post = await Post.findOne({ slug }).populate('user', 'name image');

    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Post fetched successfully",
      post,
    });

  } catch (error) {
    console.error("Get post by slug error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getSimilarCategoryPosts = async (req, res) => {
  try {
    const postId = req.params.id;

    const currentPost = await Post.findById(postId);

    if (!currentPost) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    const similarPosts = await Post.find({
      // This line EXCLUDES the current post from the results.
      _id: { $ne: postId }, 

      // This line finds posts that have AT LEAST ONE matching category.
      // It does NOT require all categories to match.
      category: { $in: currentPost.category }, 
    })
    .sort({ createdAt: -1 })
    .populate('user', 'name image');

    return res.status(200).json({
      success: true,
      message: "All similar posts fetched successfully",
      posts: similarPosts,
    });

  } catch (error) {
    console.error("Get similar posts error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};