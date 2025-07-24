import Variant from "../variants/variants.model";
import Cart from "./cart.model";

// Lấy giỏ hàng của người dùng
export const getCart = async (req, res) => {
  const userId = req.user._id;
  const cart = await Cart.findOne({ user: userId })
    .populate("items.productId")
    .populate("items.variantId");
  return res.status(200).json(cart || { user: userId, items: [] });
};

// Thêm sản phẩm vào giỏ hàng
export const addToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, variantId, quantity } = req.body;

    if (!productId || !variantId || quantity < 1) {
      return res.status(400).json({ message: "Dữ liệu không hợp lệ" });
    }

    const variant = await Variant.findById(variantId);
    if (!variant) {
      return res.status(404).json({ message: "Không tìm thấy biến thể" });
    }

    if (variant.stock < quantity) {
      return res.status(400).json({ message: "Sản phẩm đã hết hàng" });
    }

    // Trừ tồn kho
    variant.stock -= quantity;
    await variant.save();

    // Tìm hoặc tạo giỏ hàng
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const existingItem = cart.items.find(
      (item) =>
        item.productId.toString() === productId &&
        item.variantId.toString() === variantId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, variantId, quantity });
    }

    await cart.save();

    res.json({ message: "Đã thêm vào giỏ hàng", cart });
  } catch (error) {
    console.error("Lỗi thêm giỏ hàng:", error);
    res.status(500).json({ message: "Lỗi máy chủ" });
  }
};

// Xóa sản phẩm khỏi giỏ hàng
export const removeFromCart = async (req, res) => {
  const userId = req.user._id;
  const { productId, variantId } = req.query;

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Không tìm thấy giỏ hàng" });
    }

    const itemIndex = cart.items.findIndex(
      (item) =>
        item.productId.toString() === productId &&
        item.variantId.toString() === variantId
    );

    if (itemIndex === -1) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy sản phẩm trong giỏ" });
    }

    const quantity = cart.items[itemIndex].quantity;

    // ✅ Cộng lại tồn kho khi xóa
    const variant = await Variant.findById(variantId);
    if (variant) {
      variant.stock += quantity;
      await variant.save();
    }

    // ✅ Xóa sản phẩm khỏi giỏ
    cart.items.splice(itemIndex, 1);
    await cart.save();

    res.status(200).json({ message: "Đã xóa sản phẩm", cart });
  } catch (err) {
    console.error("Lỗi khi xóa sản phẩm:", err);
    res.status(500).json({ message: "Lỗi máy chủ" });
  }
};

// Cập nhật số lượng sản phẩm trong giỏ
export const updateCartQuantity = async (req, res) => {
  const userId = req.user._id;
  const { productId, variantId, quantity } = req.body;

  if (!productId || !variantId || quantity < 1) {
    return res.status(400).json({ message: "Dữ liệu không hợp lệ" });
  }

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Không tìm thấy giỏ hàng" });
    }

    const item = cart.items.find(
      (i) =>
        i.productId.toString() === productId &&
        i.variantId.toString() === variantId
    );

    if (!item) {
      return res
        .status(404)
        .json({ message: "Sản phẩm không tồn tại trong giỏ hàng" });
    }

    const variant = await Variant.findById(variantId);
    if (!variant) {
      return res.status(404).json({ message: "Không tìm thấy biến thể" });
    }

    const diff = quantity - item.quantity;

    if (diff > 0) {
      if (variant.stock < diff) {
        return res.status(400).json({ message: "Không đủ hàng" });
      }
      variant.stock -= diff;
    } else {
      variant.stock += Math.abs(diff);
    }

    await variant.save();

    item.quantity = quantity;
    await cart.save();

    res.json({ message: "Cập nhật thành công", cart });
  } catch (error) {
    console.error("Lỗi cập nhật:", error);
    res.status(500).json({ message: "Lỗi máy chủ" });
  }
};
