import Cart from "./cart.model.js";

export const addToCart = async (req, res) => {
  const { product } = req.body;
  const userId = req.user.id;

  const existing = await Cart.findOne({ userId, "product._id": product._id });
  if (existing) {
    existing.quantity += 1;
    await existing.save();
    return res.json({ cart: existing });
  }

  const newItem = await Cart.create({ userId, product, quantity: 1 });
  res.status(201).json({ cart: newItem });
};

export const getCart = async (req, res) => {
  const userId = req.user.id;
  const items = await Cart.find({ userId });
  res.json({ cart: items });
};

export const updateCart = async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;
  const userId = req.user.id;

  const item = await Cart.findOneAndUpdate(
    { userId, "product._id": productId },
    { $set: { quantity } },
    { new: true }
  );

  res.json({ cart: item });
};

export const removeCartItem = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user.id;

  await Cart.findOneAndDelete({ userId, "product._id": productId });
  res.json({ message: "Đã xoá sản phẩm khỏi giỏ hàng" });
};
