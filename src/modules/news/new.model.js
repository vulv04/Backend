import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      index: true,
    },
    seoTitle: {
      type: String,
    },
    seoDescription: {
      type: String,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tags: {
      type: [String],
      index: true,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    publishedAt: {
      type: Date,
    },
  },
  {
    timestamps: true, // auto adds createdAt & updatedAt
    versionKey: false,
  }
);

const New = mongoose.model("New", newsSchema);
export default New;
