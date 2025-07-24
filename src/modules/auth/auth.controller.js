import crypto from "crypto";
import jwt from "jsonwebtoken";
import User from "../user/user.model.js";
import generateToken from "../../common/utils/generateToken.js";
import sendEmail from "../../common/utils/sendEmail.js";

// Đăng ký người dùng mới
export const register = async (req, res) => {
  try {
    const { fullname, email, password, role } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email đã tồn tại" });

    const emailVerifyToken = crypto.randomBytes(32).toString("hex");
    console.log(emailVerifyToken);

    const user = await User.create({
      fullname,
      email,
      password,
      role,
      emailVerifyToken,
      isVerifyEmail: false,
    });

    const verifyLink = `http://localhost:3000/api/auth/verify-email?token=${emailVerifyToken}`;

    try {
      await sendEmail(
        user.email,
        "Xác thực Email - Clothing Store",
        `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
            <h2 style="color: #333;">👋 Xin chào ${fullname || "bạn"},</h2>
            <p style="font-size: 16px; color: #555;">
              Cảm ơn bạn đã đăng ký tài khoản tại <strong>Clothing Store</strong>!<br/>
              Vui lòng nhấn vào nút bên dưới để xác minh email của bạn:
            </p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${verifyLink}" style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: white; text-decoration: none; border-radius: 6px; font-size: 16px;">
                Xác minh Email
              </a>
            </div>
            <p style="font-size: 14px; color: #999;">
              Nếu bạn không yêu cầu tạo tài khoản, bạn có thể bỏ qua email này.
            </p>
            <hr/>
            <p style="font-size: 12px; color: #ccc;">
              © ${new Date().getFullYear()} Clothing Store. All rights reserved.
            </p>
          </div>
        `
      );
    } catch (err) {
      console.error("Không gửi được email:", err.message);
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
      // Token không đúng
      return res.redirect(
        `${process.env.CLIENT_URL}/verify-email?status=error`
      );
    }

    if (user.isVerifyEmail) {
      // Đã xác minh trước đó
      return res.redirect(
        `${process.env.CLIENT_URL}/verify-email?status=already`
      );
    }

    // Cập nhật trạng thái xác minh
    user.isVerifyEmail = true;
    user.emailVerifyToken = null;
    await user.save();

    // Thành công
    return res.redirect(
      `${process.env.CLIENT_URL}/verify-email?status=success`
    );
  } catch (err) {
    // Lỗi bất ngờ
    return res.redirect(`${process.env.CLIENT_URL}/verify-email?status=error`);
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
