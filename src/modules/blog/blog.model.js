// models/blog.model.js
import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, index: true },
    content: { type: String, required: true },
    thumbnail: { type: String },
    slug: { type: String, unique: true, index: true },
    seoTitle: { type: String },
    seoDescription: { type: String },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tags: { type: [String], index: true },
    isPublished: { type: Boolean, default: false },
    publishedAt: { type: Date },
  },
  { timestamps: true, versionKey: false }
);

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
