// routes/upload.js
import express from "express";
import multer from "multer";
import path from "path";

const router = express.Router();

// Cấu hình lưu ảnh vào thư mục /uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post("/upload", upload.array("images", 5), (req, res) => {
  const imagePaths = req.files.map((file) => `/uploads/${file.filename}`);
  res.json({ images: imagePaths });
});

export default router;
