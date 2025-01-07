import multer from "multer";
import path from "path";

// Cấu hình nơi lưu trữ file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Thư mục lưu trữ file
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

// Middleware kiểm tra file upload
const fileFilter = (req, file, cb) => {
  const fileExtension = path.extname(file.originalname).toLowerCase();
  if (fileExtension === ".txt") {
    cb(null, true); // Chỉ chấp nhận file .txt
  } else {
    cb(new Error("Only .txt files are allowed!"), false);
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
