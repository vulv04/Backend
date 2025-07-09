import Variant from "./variants.model";


// Tạo mới biến thể
export const createVariant = async (req, res) => {
  const { productId, color, size, stock, price, images, sku } = req.body;
  try {
    const newVariant = await Variant.create({
      productId,
      color,
      size,
      stock,
      price,
      images,
      sku,
    });
    res.status(201).json(newVariant);
  } catch (error) {
    res.status(400).json({ message: "Tạo biến thể thất bại", error });
  }
};

// Lấy tất cả biến thể theo productId
export const getVariantsByProductId = async (req, res) => {
  try {
    const { productId } = req.params;
    const variants = await Variant.find({ productId });
    res.status(200).json(variants);
  } catch (error) {
    res.status(500).json({ message: "Không thể lấy biến thể", error });
  }
};

// Lấy chi tiết 1 biến thể
export const getVariantById = async (req, res) => {
  try {
    const { id } = req.params;
    const variant = await Variant.findById(id);
    if (!variant) {
      return res.status(404).json({ message: "Biến thể không tồn tại" });
    }
    res.status(200).json(variant);
  } catch (error) {
    res.status(500).json({ message: "Không thể lấy chi tiết biến thể", error });
  }
};

// Cập nhật biến thể
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
    res.status(500).json({ message: "Lỗi cập nhật biến thể", error });
  }
};

// Xoá biến thể
export const deleteVariant = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Variant.findByIdAndDelete(id);
    if (!deleted) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy biến thể để xoá" });
    }
    res.status(200).json({ message: "Xoá biến thể thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xoá biến thể", error });
  }
};
