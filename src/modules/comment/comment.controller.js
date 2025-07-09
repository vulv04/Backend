import Comment from "./comment.model";


export const getCommentsByProductId = async (req, res) => {
  try {
    const comments = await Comment.find({
      productId: req.params.productId,
    }).sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: "Lỗi khi lấy bình luận" });
  }
};

export const addComment = async (req, res) => {
  try {
    console.log("🔥 Dữ liệu nhận từ frontend:", req.body);

    const newComment = new Comment(req.body);
    await newComment.save();

    res.status(201).json(newComment);
  } catch (err) {
    console.error("🚨 Lỗi tạo comment:", err.message);
    res.status(500).json({ error: err.message });
  }
};
  
  