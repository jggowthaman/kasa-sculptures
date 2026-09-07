const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const router = express.Router();

// =====================================================
// CATEGORY IMAGE UPLOAD SETUP
// =====================================================

const uploadDir = path.join(__dirname, "../uploads/categories");

// Create folder if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

// Allow image files only
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;

  const extName = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  const mimeType = allowedTypes.test(file.mimetype);

  if (extName && mimeType) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Only JPG, JPEG, PNG and WEBP images are allowed."
      )
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});

// =====================================================
// GET ALL CATEGORIES
// =====================================================

router.get("/", getCategories);

// =====================================================
// GET SINGLE CATEGORY
// =====================================================

router.get("/:id", getCategoryById);

// =====================================================
// CREATE CATEGORY
// =====================================================

router.post("/", upload.single("image"), createCategory);

// =====================================================
// UPDATE CATEGORY
// =====================================================

router.put("/:id", upload.single("image"), updateCategory);

// =====================================================
// DELETE CATEGORY
// =====================================================

router.delete("/:id", deleteCategory);

module.exports = router;