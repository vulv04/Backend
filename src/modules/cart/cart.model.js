import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: { type: Object, required: true },
    quantity: { type: Number, default: 1 },
  },
  { timestamps: true }
);

export default mongoose.model("Cart", cartSchema);
