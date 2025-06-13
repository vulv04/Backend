import jwt from "jsonwebtoken";
import User from "../../modules/user/User.js";

export const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select("-password");
      if (!user) return res.status(401).json({ message: "User không tồn tại" });

      req.user = user; // gán vào request để dùng ở middleware/route tiếp theo
      next();
    } catch (error) {
      res.status(401).json({ message: "Token không hợp lệ" });
    }
  } else {
    res.status(401).json({ message: "Không có token" });
  }
};
