import crypto from "crypto";
import jwt from "jsonwebtoken";
import User from "../user/user.model.js";
import generateToken from "../../common/utils/generateToken.js";
import sendEmail from "../../common/utils/sendEmail.js";

// Middleware bảo vệ route
export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.User = await User.findById(decoded.id).select("-password");
      if (!req.User) return res.status(401).json({ message: "User not found" });

      next();
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

// Đăng ký người dùng mới
export const register = async (req, res) => {
  try {
    const { fullname, email, password, role } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email đã tồn tại" });

    const emailVerifyToken = crypto.randomBytes(32).toString("hex");

    const user = await User.create({
      fullname,
      email,
      password,
      role,
      emailVerifyToken,
      isVerifyEmail: false,
    });

    const verifyLink = `${process.env.CLIENT_URL}/verify-email?token=${emailVerifyToken}`;

    try {
      await sendEmail(
        user.email,
        "Xác thực email",
        `<p>Chào ${fullname}, vui lòng xác nhận email:</p><a href="${verifyLink}">${verifyLink}</a>`
      );
    } catch (err) {
      console.error("❌ Không gửi được email:", err.message);
      return res
        .status(500)
        .json({ message: "Không gửi được email xác minh!" });
    }

    res.status(201).json({
      message: "Đăng ký thành công. Vui lòng xác nhận email.",
      user: { _id: user._id, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Xác minh email từ link
export const verifyEmail = async (req, res) => {
  const { token } = req.query;

  try {
    const user = await User.findOne({ emailVerifyToken: token });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Token không hợp lệ hoặc đã hết hạn" });
    }

    user.isVerifyEmail = true;
    user.emailVerifyToken = null;
    await user.save();

    res.status(200).json({ message: "Xác thực email thành công!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Đăng nhập
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Sai email hoặc mật khẩu" });
    }

    if (!user.isVerifyEmail) {
      return res
        .status(403)
        .json({ message: "Vui lòng xác minh email trước khi đăng nhập" });
    }

    res.status(200).json({
      accessToken: generateToken(user._id),
      user: {
        _id: user._id,
        email: user.email,
        role: user.role,
        fullname: user.fullname,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
