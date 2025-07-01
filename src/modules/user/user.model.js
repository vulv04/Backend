import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    role: {
      type: String,
      enum: ["member", "admin", "manager", "superAdmin"],
      default: "member",
    },

    // Xác minh email
    isVerifyEmail: { type: Boolean, default: false },
    emailVerifyToken: { type: String },

    // Xác minh số điện thoại (nếu cần sau này)
    isVerifyPhoneNumber: { type: Boolean, default: false },

    // 2 bước xác minh (nếu cần)
    is2StepVerify: { type: Boolean, default: false },

    lastestLogin: { type: Date, default: null },

    isActive: { type: Boolean, default: true },
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
