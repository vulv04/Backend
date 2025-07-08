import Cart from "./cart.model";

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
