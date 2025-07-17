import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    link: { type: String },
    description: { type: String },
    isActive: { type: Boolean, default: true },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

const Banner = mongoose.model("Banner", bannerSchema);
export default Banner;
