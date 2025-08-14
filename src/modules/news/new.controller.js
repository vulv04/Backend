// controllers/news.controller.js
import MESSAGES from "../../common/contstans/messages.js";
import News from "./new.model.js";
import slugify from "slugify";

// Tạo tin tức
export const createNews = async (req, res) => {
  try {
    const { title, content, description, image, isPublished } = req.body;

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Tiêu đề và nội dung là bắt buộc." });
    }

    const news = await News.create({
      title,
      content,
      description,
      image,
      isPublished,
      publishedAt: isPublished ? new Date() : null,
      createdBy: req.user?._id,
    });

    res.status(201).json(news);
  } catch (error) {
    res.status(400).json({
      message: MESSAGES?.NEWS?.CREATE_FAILED || "Tạo tin tức thất bại.",
      error: error.message,
    });
  }
};

// Lấy tất cả tin tức (thêm phân trang & lọc)
export const getAllNews = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "", published } = req.query;
    const filter = {};

    if (published === "true") filter.isPublished = true;
    if (search) filter.title = { $regex: search, $options: "i" };

    const news = await News.find(filter)
      .sort({ publishedAt: -1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await News.countDocuments(filter);

    res.status(200).json({ data: news, total });
  } catch (error) {
    res.status(500).json({
      message: MESSAGES?.NEWS?.LIST_ERROR || "Lỗi lấy danh sách tin tức",
      error: error.message,
    });
  }
};

// Lấy tin tức theo id
export const getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({
        message: MESSAGES?.NEWS?.NOT_FOUND || "Không tìm thấy tin tức",
      });
    }
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({
      message: MESSAGES?.NEWS?.NOT_FOUND || "Không tìm thấy tin tức",
      error: error.message,
    });
  }
};

// Lấy tin tức theo slug
export const getNewsBySlug = async (req, res) => {
  try {
    const news = await News.findOne({
      slug: req.params.slug,
      isPublished: true,
    });
    if (!news) {
      return res.status(404).json({
        message: MESSAGES?.NEWS?.NOT_FOUND || "Không tìm thấy tin tức",
      });
    }
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({
      message: MESSAGES?.NEWS?.NOT_FOUND || "Không tìm thấy tin tức",
      error: error.message,
    });
  }
};

// Cập nhật tin tức
export const updateNews = async (req, res) => {
  try {
    const dataUpdate = { ...req.body };

    // Nếu đổi title → cập nhật slug
    if (dataUpdate.title) {
      dataUpdate.slug = slugify(dataUpdate.title, {
        lower: true,
        strict: true,
      });
    }

    // Nếu publish mà chưa có publishedAt
    if (dataUpdate.isPublished && !dataUpdate.publishedAt) {
      dataUpdate.publishedAt = new Date();
    }

    const news = await News.findByIdAndUpdate(req.params.id, dataUpdate, {
      new: true,
    });
    if (!news) {
      return res.status(404).json({
        message: MESSAGES?.NEWS?.NOT_FOUND || "Không tìm thấy tin tức",
      });
    }
    res.status(200).json(news);
  } catch (error) {
    res.status(400).json({
      message: MESSAGES?.NEWS?.UPDATE_FAILED || "Cập nhật tin tức thất bại",
      error: error.message,
    });
  }
};

// Xóa tin tức
export const deleteNews = async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    if (!news) {
      return res.status(404).json({
        message: MESSAGES?.NEWS?.NOT_FOUND || "Không tìm thấy tin tức",
      });
    }
    res.status(200).json({
      message: MESSAGES?.NEWS?.DELETE_SUCCESS || "Xóa tin tức thành công",
    });
  } catch (error) {
    res.status(500).json({
      message: MESSAGES?.NEWS?.DELETE_FAILED || "Xóa tin tức thất bại",
      error: error.message,
    });
  }
};
