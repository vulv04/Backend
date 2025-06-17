import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema(
	{
		title: {
			type: String,
			unique: true,
			required: true,
		},
		description: {
			type: String,
		},
		slug: {
			type: String,
			unique: true,
			required: true,
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
