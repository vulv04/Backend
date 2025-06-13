import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    author: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);
  

export default mongoose.model("Comment", commentSchema);
