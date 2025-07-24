import Brand from "./brand.model.js";

// Tạo brand
export const createBrand = async (req, res) => {
  try {
    const { name, logo } = req.body;

    if (!name)
      return res.status(400).json({ message: "Tên brand là bắt buộc" });

    const brand = new Brand({ name, logo });
    await brand.save();
    res.status(201).json({ message: "Tạo brand thành công", brand });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server khi tạo brand", error: err });
  }
};
export const getTrashedBrands = async (req, res) => {
  try {
    const brands = await Brand.find({ isDeleted: true });
    res.json({ brands });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Lỗi khi lấy danh sách đã xoá", error: err });
  }
};

// Lấy tất cả brand chưa bị xóa mềm
export const getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.find({ isDeleted: false });
    res.json({ brands });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi lấy brand", error: err });
  }
};

// Lấy 1 brand
export const getBrandById = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) return res.status(404).json({ message: "Brand không tồn tại" });
    res.json({ brand });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi lấy brand", error: err });
  }
};

// Cập nhật brand
export const updateBrand = async (req, res) => {
  try {
    const updated = await Brand.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({ message: "Cập nhật brand thành công", brand: updated });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi cập nhật brand", error: err });
  }
};

// XÓA MỀM brand
export const softDeleteBrand = async (req, res) => {
  try {
    await Brand.findByIdAndUpdate(req.params.id, { isDeleted: true });
    res.json({ message: "Đã ẩn thương hiệu" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi xoá mềm brand", error: err });
  }
};

// KHÔI PHỤC brand
export const restoreBrand = async (req, res) => {
  try {
    await Brand.findByIdAndUpdate(req.params.id, { isDeleted: false });
    res.json({ message: "Đã khôi phục thương hiệu" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi khôi phục brand", error: err });
  }
};

// XÓA CỨNG brand
export const deleteBrand = async (req, res) => {
  try {
    await Brand.findByIdAndDelete(req.params.id);
    res.json({ message: "Xóa brand vĩnh viễn thành công" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi xóa brand", error: err });
  }
};
// Thêm vào cuối file brand.controller.js
export const toggleBrandStatus = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) {
      return res.status(404).json({ message: "Thương hiệu không tồn tại" });
    }

    brand.isActive = !brand.isActive;
    await brand.save();

    res.json({ message: "Đã cập nhật trạng thái", brand });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server khi cập nhật trạng thái", error: err });
  }
};
