import Product from "../product/product.model";
import Variant from "./variant.model";


// Tạo mới một variant
export const createVariant = async (req, res) => {
  try {
    const { productId, color, size, stock, price, sku, images } = req.body;

    // Kiểm tra productId tồn tại
    const productExists = await Product.findById(productId);
    if (!productExists) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }

    const variant = await Variant.create({
      productId,
      color,
      size,
      stock,
      price,
      sku,
      images,
    });

    res.status(201).json(variant);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Tạo variant thất bại", error: error.message });
  }
};

// Lấy tất cả variant theo productId
export const getVariantsByProductId = async (req, res) => {
  try {
    const { productId } = req.params;

    const variants = await Variant.find({ productId });
    res.status(200).json(variants);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Không lấy được danh sách biến thể",
        error: error.message,
      });
  }
};

// Lấy một variant theo ID
export const getVariantById = async (req, res) => {
  try {
    const { id } = req.params;
    const variant = await Variant.findById(id);

    if (!variant) {
      return res.status(404).json({ message: "Không tìm thấy biến thể" });
    }

    res.status(200).json(variant);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi lấy biến thể", error: error.message });
  }
};

// Cập nhật một variant theo ID
export const updateVariant = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Variant.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updated) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy biến thể để cập nhật" });
    }

    res.status(200).json(updated);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Cập nhật biến thể thất bại", error: error.message });
  }
};

// Xoá một variant theo ID
export const deleteVariant = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Variant.findByIdAndDelete(id);
    if (!deleted) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy biến thể để xoá" });
    }

    res.status(200).json({ message: "Đã xoá biến thể thành công" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Xoá biến thể thất bại", error: error.message });
  }
};
