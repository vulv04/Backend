// controllers/user.controller.js
import handleAsync from "../../common/utils/handleAsync.js";
import User from "./user.model.js";

export const getAllUsers = handleAsync(async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});
export const getUserById = handleAsync(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) {
    res.status(404);
    throw new Error("Người dùng không tồn tại");
  }
  res.json(user);
});

export const updateUser = handleAsync(async (req, res) => {
  const { name, email, isAdmin } = req.body;
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("Người dùng không tồn tại");
  }

  user.name = name || user.name;
  user.email = email || user.email;
  if (typeof isAdmin === "boolean") user.isAdmin = isAdmin;

  const updatedUser = await user.save();
  res.json({ message: "Cập nhật thành công", user: updatedUser });
});

export const deleteUser = handleAsync(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("Người dùng không tồn tại");
  }

  await user.remove();
  res.json({ message: "Xoá người dùng thành công" });
});
