import mongoose from "mongoose";
import slugMiddleware from "../../common/middlewares/slugmiddlewares";

const productSchema = new mongoose.Schema(
  {
    variants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Variant" }],
    title: { type: String, required: true },
    price: { type: Number, required: true },
    oldPrice: Number,
    discountPercent: Number,
    description: String,
    category: String,
    brand: String,
    gender: { type: String }, // Nam, Nữ, Unisex
    label: String,
    promo: String,
    thumbnail: String,
    images: { type: [String], default: [] },
    slug: { type: String, unique: true },
    createdBy: { type: String, default: "admin" },
    completed: { type: Boolean, default: false },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },

    // ✅ Thêm đoạn này
    status: {
      type: String,
      enum: ["pending", "processing", "shipping", "completed", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
productSchema.plugin(slugMiddleware("title", "slug", true));

const Product = mongoose.model("Product", productSchema);
export default Product;
