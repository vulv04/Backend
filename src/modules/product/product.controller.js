import Product from "./product.model.js";
import Variant from "../variants/variants.model.js";
import handleAsync from "../../common/utils/handleAsync.js";
import MESSAGES from "../../common/contstans/messages.js";
import { generateSKU } from "../../common/utils/skuren.js";

// Lấy danh sách tất cả sản phẩm
export const getListProduct = handleAsync(async (req, res) => {
  const products = await Product.find().populate("variants").lean();
  res.status(200).json(products);
});

// Lấy chi tiết 1 sản phẩm + các biến thể
export const getProductDetail = handleAsync(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id).lean();

  if (!product) {
    return res.status(404).json({ message: MESSAGES.PRODUCT.NOT_FOUND });
  }

  const variants = await Variant.find({ productId: product._id }).lean();
  res.status(200).json({ ...product, variants });
});

// Tạo mới 1 sản phẩm
export const createProduct = handleAsync(async (req, res) => {
  const { variants, ...productData } = req.body;

  // 1. Tạo sản phẩm
  const product = new Product(productData);

  // 2. Tạo các biến thể nếu có
  let variantId = [];
  if (Array.isArray(variants) && variants.length > 0) {
    const variantsToInsert = variants.map((variant) => ({
      ...variant,
      productId: product._id, // ✅ ĐÚNG TÊN field trong Variant schema
      sku: generateSKU(),
    }));

    const newVariant = await Variant.insertMany(variantsToInsert);
    newVariant.forEach((variant) => variantId.push(variant._id));
  }
  product.variants = variantId;
  await product.save();

  // 3. Trả về dữ liệu
  const fullProduct = await Product.findById(product._id);
  res.status(201).json({
    message: "Tạo sản phẩm thành công",
    product: fullProduct,
  });
});

// Cập nhật sản phẩm theo ID
export const updateProduct = handleAsync(async (req, res) => {
  const { id } = req.params;
  const updated = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!updated) {
    return res.status(404).json({ message: MESSAGES.PRODUCT.UPDATE_NOT_FOUND });
  }

  res.status(200).json(updated);
});
// Soft delete: Gắn isDeleted = true
export const softDeleteProduct = handleAsync(async (req, res) => {
  const { id } = req.params;
  console.log("Soft delete called with id:", id);

  const product = await Product.findById(id);
  if (!product || product.isDeleted) {
    return res.status(404).json({ message: MESSAGES.PRODUCT.DELETE_NOT_FOUND });
  }

  product.isDeleted = true;
  await product.save();

  res.status(200).json({ message: MESSAGES.PRODUCT.DELETE_SUCCESS });
});

// Hard delete: Xóa khỏi database
export const hardDeleteProduct = handleAsync(async (req, res) => {
  const { id } = req.params;

  const deleted = await Product.findByIdAndDelete(id);
  if (!deleted) {
    return res.status(404).json({ message: MESSAGES.PRODUCT.DELETE_NOT_FOUND });
  }

  res.status(200).json({ message: MESSAGES.PRODUCT.HARD_DELETE_SUCCESS });
});

// Restore: Gắn isDeleted = false
export const restoreProduct = handleAsync(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);
  if (!product || !product.isDeleted) {
    return res.status(404).json({ message: MESSAGES.PRODUCT.RESTORE_FAILED });
  }

  product.isDeleted = false;
  await product.save();

  res.status(200).json({ message: MESSAGES.PRODUCT.RESTORE_SUCCESS });
});
