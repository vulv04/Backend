import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    oldPrice: {
      type: Number,
    },
    discountPercent: {
      type: Number,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
    },
    gender: {
      type: String, // Nam, Nữ, Unisex
    },
    size: {
      type: String, // Ví dụ: "S - Freesize"
    },
    label: {
      type: String, // Ví dụ: "Siêu Sale 9.9"
    },
    promo: {
      type: String, // Ví dụ: "Mua 2 giảm thêm 10%"
    },
    colors: {
      type: [String], // Mảng mã màu
      default: [],
    },
    thumbnail: {
      type: String, // Hình ảnh chính
    },
    images: {
      type: [String], // Mảng hình ảnh phụ
      default: [],
    },
    slug: {
      type: String,
      unique: true,
      required: true,
    },
    // === Các trường thêm mới ===
    completed: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    createdBy: {
      type: String,
      default: "admin",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Product", productSchema);
