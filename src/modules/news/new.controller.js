// controllers/news.controller.js
import MESSAGES from "../../common/contstans/messages.js";
import New from "./new.model.js";

export const createNews = async (req, res) => {
  try {
    const { title, content, description, image, isPublished, publishedAt } =
      req.body;

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
      publishedAt,
      createdBy: req.user._id,
    });

    res.status(201).json(news);
  } catch (error) {
    res.status(400).json({
      message: MESSAGES?.NEWS?.CREATE_FAILED || "Tạo tin tức thất bại.",
      error: error.message || error,
    });
  }
};

export const getAllNews = async (req, res) => {
  try {
    const news = await New.find({ isPublished: true }).sort({
      publishedAt: -1,
    });
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: MESSAGES.NEWS.LIST_ERROR });
  }
};

export const getNewsBySlug = async (req, res) => {
  try {
    const news = await New.findOne({
      slug: req.params.slug,
      isPublished: true,
    });
    if (!news)
      return res.status(404).json({ message: MESSAGES.NEWS.NOT_FOUND });
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: MESSAGES.NEWS.NOT_FOUND });
  }
};

export const updateNews = async (req, res) => {
  try {
    const news = await New.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!news)
      return res.status(404).json({ message: MESSAGES.NEWS.NOT_FOUND });
    res.status(200).json(news);
  } catch (error) {
    res.status(400).json({ message: MESSAGES.NEWS.UPDATE_FAILED, error });
  }
};

export const deleteNews = async (req, res) => {
  try {
    const news = await New.findByIdAndDelete(req.params.id);
    if (!news)
      return res.status(404).json({ message: MESSAGES.NEWS.NOT_FOUND });
    res.status(200).json({ message: MESSAGES.NEWS.DELETE_SUCCESS });
  } catch (error) {
    res.status(500).json({ message: MESSAGES.NEWS.DELETE_FAILED });
  }
};
