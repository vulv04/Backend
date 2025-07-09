// controllers/news.controller.js
import News from "../models/news.model.js";
import { MESSAGES } from "../../common/constants/messages.js";

export const createNews = async (req, res) => {
  try {
    const news = await News.create({ ...req.body, createdBy: req.user._id });
    res.status(201).json(news);
  } catch (error) {
    res.status(400).json({ message: MESSAGES.NEWS.CREATE_FAILED, error });
  }
};

export const getAllNews = async (req, res) => {
  try {
    const news = await News.find({ isPublished: true }).sort({
      publishedAt: -1,
    });
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: MESSAGES.NEWS.LIST_ERROR });
  }
};

export const getNewsBySlug = async (req, res) => {
  try {
    const news = await News.findOne({
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
    const news = await News.findByIdAndUpdate(req.params.id, req.body, {
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
    const news = await News.findByIdAndDelete(req.params.id);
    if (!news)
      return res.status(404).json({ message: MESSAGES.NEWS.NOT_FOUND });
    res.status(200).json({ message: MESSAGES.NEWS.DELETE_SUCCESS });
  } catch (error) {
    res.status(500).json({ message: MESSAGES.NEWS.DELETE_FAILED });
  }
};
