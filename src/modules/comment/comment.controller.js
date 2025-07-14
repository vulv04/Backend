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

// comment.controller.js
export const addComment = async (req, res) => {
  const { productId, userId, content, rating } = req.body;
  console.log("📩 Body:", req.body); // 👉 Xem trên console khi gửi comment

  // Kiểm tra nếu đã có bình luận
  const existing = await Comment.findOne({ productId, userId });

  if (existing) {
    return res
      .status(400)
      .json({ message: "Bạn đã đánh giá sản phẩm này rồi." });
  }

  const comment = new Comment({
    productId,
    userId,
    content,
    rating,
    author: req.body.author,
  });

  await comment.save();
  return res.status(201).json(comment);
};
