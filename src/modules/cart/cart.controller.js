import Cart from "./cart.model.js";

export const getCart = async (req, res) => {
  const userId = req.user._id;
  const cart = await Cart.findOne({ user: userId }).populate("items.productId");
  res.status(200).json(cart || { user: userId, items: [] });
};

export const addToCart = async (req, res) => {
  const userId = req.user._id;
  const { productId, quantity, color, size } = req.body;

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = new Cart({ user: userId, items: [] });
  }

  const existingItem = cart.items.find(
    (item) =>
      item.productId.toString() === productId &&
      item.color === color &&
      item.size === size
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ productId, quantity, color, size });
  }

  await cart.save();
  res.status(200).json(cart);
};

export const removeFromCart = async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.params;

  const cart = await Cart.findOne({ user: userId });
  cart.items = cart.items.filter(
    (item) => item.productId.toString() !== productId
  );
  await cart.save();

  res.json(cart);
};

export const updateCartQuantity = async (req, res) => {
  const userId = req.user._id;
  const { productId, quantity } = req.body;

  if (!productId || quantity < 1) {
    return res.status(400).json({ message: "Dữ liệu không hợp lệ" });
  }

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart)
      return res.status(404).json({ message: "Không tìm thấy giỏ hàng" });

    const item = cart.items.find((i) => i.productId.toString() === productId);

    if (!item) {
      return res
        .status(404)
        .json({ message: "Sản phẩm không tồn tại trong giỏ hàng" });
    }

    item.quantity = quantity;
    await cart.save();

    res.json({ message: "Cập nhật số lượng thành công", cart });
  } catch (error) {
    console.error("Lỗi cập nhật giỏ hàng:", error);
    res.status(500).json({ message: "Lỗi máy chủ" });
  }
};
