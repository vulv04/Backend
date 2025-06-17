import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  logoUrl: {
    type: String,
  },
  description: {
    type: String,
  },
  deletedAt: {
    type: Date,
    default: null,
  },
  slug: {
    type: String,
    required: true,
  },
});
const Brand = mongoose.model("Brand", brandSchema);
export default Brand;
