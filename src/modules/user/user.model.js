import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["member", "admin", "manager", "superAdmin"],
      default: "member",
    },

    // Avatar & mô tả cá nhân
    avatarUrl: {
      type: String,
    },

    bio: {
      type: String,
    },

    // Danh sách địa chỉ (có thể mở rộng)
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },

    phone_number: {
      type: String,
    },
    isVerifyPhoneNumber: {
      type: Boolean,
      default: false,
    },
    is2StepVerify: {
      type: Boolean,
      default: false,
    },

    // Đăng nhập gần nhất
    lastestLogin: {
      type: Date,
      default: null,
    },

    // Kích hoạt tài khoản
    isActive: {
      type: Boolean,
      default: true,
    },

    // Reset mật khẩu
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
    emailVerifyToken: { type: String },
    emailVerifyTokenExpires: { type: Date },
    isVerifyEmail: { type: Boolean, default: false },

    // Token làm mới
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
