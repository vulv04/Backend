import Product from "./Product.js";
// Danh sach san pham
export const getListProduct = async (req, res) => {
  try {
    const products = await Product.find(); // lấy tất cả sản phẩm
    return res.status(200).send(products);
  } catch (error) {
    return res.status(500).send(error);
  }
};
// Chi tiet 1 san pham
export const getProductDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    return res.status(200).send(product);
  } catch (error) {
    return res.status(400).send(error);
  }
};
// Them  1 san pham
export const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    return res.status(201).send(product);
  } catch (error) {
    return res.status(400).send(error);
  }
};
// Update 1 san pham
export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updated = await Product.findByIdAndUpdate(productId, req.body, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }

    res.json(updated);
  } catch (error) {
    console.error("Lỗi update:", error);
    res.status(500).json({ message: "Lỗi server khi cập nhật" });
  }
};
// Xoa San Pham
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).send({ message: "Product not found" });
    }

    return res.status(200).send({ message: "Product deleted successfully" });
  } catch (error) {
    return res.status(400).send(error);
  }
};
 