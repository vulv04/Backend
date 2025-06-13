import CartItem from "../models/CartItem.js";

export const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    let item = await CartItem.findOne({ productId });

    if (item) {
      item.quantity += 1;
      await item.save();
    } else {
      item = new CartItem({ productId, quantity: 1 });
      await item.save();
    }

    res.status(200).send(item);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getCart = async (req, res) => {
  const items = await CartItem.find().populate("productId");
  res.status(200).send(items);
};

export const removeFromCart = async (req, res) => {
  const { id } = req.params;
  await CartItem.findByIdAndDelete(id);
  res.status(200).send({ message: "Removed" });
};
