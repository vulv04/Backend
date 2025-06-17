import generateToken from "../../common/utils/generateToken.js";
import User from "../user/User.js";

export const protect = async (req, res, next) => {
  let token;

  // 1. Lấy token từ header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // 2. Xác thực token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. Tìm user từ token
      req.user = await User.findById(decoded.id).select("-password"); // loại bỏ password
      if (!req.user) return res.status(401).json({ message: "User not found" });

      next(); // tiếp tục route
    } catch (error) {
      return res.status(401).json({ message: "Token không hợp lệ" });
    }
  }

  if (!token) {
    return res
      .status(401)
      .json({ message: "Không có token, truy cập bị từ chối" });
  }
};


export const register = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email đã tồn tại" });

    const user = await User.create({ email, password, role });
    res.status(201).json({ user, token: generateToken(user._id) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Sai email hoặc mật khẩu" });
    }

    res.status(200).json({
      accessToken: generateToken(user._id),
      user: {
        _id: user._id, // ✅ Sửa
        email: user.email,
        role: user.role,
        username: user.username, // ✅ Thêm nếu có
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



