import Blog from "../models/blog.model.js";
import { MESSAGES } from "../../common/constants/messages.js";

export const createBlog = async (req, res) => {
  try {
    const blog = await Blog.create({ ...req.body, authorId: req.user._id });
    res.status(201).json(blog);
  } catch (error) {
    res.status(400).json({ message: MESSAGES.BLOG.CREATE_FAILED, error });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true })
      .populate("authorId", "fullname")
      .sort({ publishedAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: MESSAGES.BLOG.LIST_ERROR });
  }
};

export const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({
      slug: req.params.slug,
      isPublished: true,
    }).populate("authorId", "fullname");
    if (!blog)
      return res.status(404).json({ message: MESSAGES.BLOG.NOT_FOUND });
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: MESSAGES.BLOG.NOT_FOUND });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!blog)
      return res.status(404).json({ message: MESSAGES.BLOG.NOT_FOUND });
    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ message: MESSAGES.BLOG.UPDATE_FAILED, error });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog)
      return res.status(404).json({ message: MESSAGES.BLOG.NOT_FOUND });
    res.status(200).json({ message: MESSAGES.BLOG.DELETE_SUCCESS });
  } catch (error) {
    res.status(500).json({ message: MESSAGES.BLOG.DELETE_FAILED });
  }
};
