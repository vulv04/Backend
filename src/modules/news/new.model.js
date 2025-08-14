import mongoose from "mongoose";
import slugify from "slugify";

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Tiêu đề không được để trống"],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
    excerpt: {
      type: String, // Tóm tắt ngắn
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Nội dung không được để trống"],
    },
    image: {
      type: String, // URL ảnh đại diện
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
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
    timestamps: true, // createdAt & updatedAt
  }
);

// Middleware tạo slug và xử lý publishedAt
newsSchema.pre("save", async function (next) {
  // Cập nhật slug khi tạo hoặc đổi title
  if (this.isModified("title")) {
    let baseSlug = slugify(this.title, { lower: true, strict: true });
    let slug = baseSlug;
    let counter = 1;

    // Check trùng slug và thêm hậu tố
    while (await mongoose.models.News.findOne({ slug })) {
      slug = `${baseSlug}-${counter++}`;
    }

    this.slug = slug;
  }

  // Set publishedAt nếu isPublished = true mà chưa có
  if (this.isPublished && !this.publishedAt) {
    this.publishedAt = new Date();
  }

  next();
});

const News = mongoose.model("News", newsSchema);
export default News;
