import mongoose, { Schema } from "mongoose";

const categoryShema = new Schema(
  {
    title: {
      type: String,
      unique: true,
    },
    discription: {
      type: String,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model("Category", categoryShema);
