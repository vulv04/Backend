import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    logoUrl: {
      type: String,
      default: "",
    },
    seoTitle: {
      type: String,
      trim: true,
    },
    seoDescription: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
