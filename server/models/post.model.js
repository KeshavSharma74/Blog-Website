import mongoose from "mongoose";

const { Schema } = mongoose;

// Post schema aligned with Tiptap
const postSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  description:{
    type: String,
    required: true
  },
  mainImage: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  subTitle: {
    type: String,
    required: true
  },
  // Multiple categories allowed
  category: {
    type: [
      {
        type: String,
        enum: ["AI", "Computer", "Tech", "Science", "Other"]
      }
    ],
    required: true,
    validate: [arr => arr.length > 0, "At least one category is required"]
  },
  // Store full Tiptap JSON content here
  content: {
    type: Object,  // or Schema.Types.Mixed
    required: true
  },
  // Optional: store HTML version for fast rendering
  contentHTML: {
    type: String
  }
}, { timestamps: true });

const Post = mongoose.model("Post", postSchema);

export default Post;
