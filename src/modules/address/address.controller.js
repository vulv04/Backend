import Address from "./address.model.js";
import handleAsync from "../../common/utils/handleAsync.js";
import MESSAGES from "../../common/contstans/messages.js";

// Thêm địa chỉ
export const createAddress = handleAsync(async (req, res) => {
  const userId = req.user._id;
  const address = await Address.create({ ...req.body, user: userId });
  res.status(201).json({ message: MESSAGES.CREATED, data: address });
});

// Lấy tất cả địa chỉ của user
export const getAddressesByUser = handleAsync(async (req, res) => {
  const userId = req.user._id;
  const addresses = await Address.find({ user: userId });
  res.status(200).json({ message: MESSAGES.OK, data: addresses });
});

// Lấy chi tiết 1 địa chỉ theo id
export const getAddressById = handleAsync(async (req, res) => {
  const address = await Address.findById(req.params.id);
  if (!address) return res.status(404).json({ message: MESSAGES.NOT_FOUND });
  res.status(200).json({ message: MESSAGES.OK, data: address });
});

// Cập nhật địa chỉ
export const updateAddress = handleAsync(async (req, res) => {
  const address = await Address.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!address) return res.status(404).json({ message: MESSAGES.NOT_FOUND });
  res.status(200).json({ message: MESSAGES.UPDATED, data: address });
});

// Xóa địa chỉ
export const deleteAddress = handleAsync(async (req, res) => {
  const address = await Address.findByIdAndDelete(req.params.id);
  if (!address) return res.status(404).json({ message: MESSAGES.NOT_FOUND });
  res.status(200).json({ message: MESSAGES.DELETED });
});
