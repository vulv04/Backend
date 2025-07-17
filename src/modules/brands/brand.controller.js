import Brand from "./brand.model.js";

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

export const getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.find();
    res.json({ brands });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi lấy brand", error: err });
  }
};

export const getBrandById = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) return res.status(404).json({ message: "Brand không tồn tại" });
    res.json({ brand });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi lấy brand", error: err });
  }
};

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

export const deleteBrand = async (req, res) => {
  try {
    await Brand.findByIdAndDelete(req.params.id);
    res.json({ message: "Xóa brand thành công" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi xóa brand", error: err });
  }
};
