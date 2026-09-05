const express = require("express");

const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const {
  getSculptures,
  getSculptureById,
  createSculpture,
  updateSculpture,
  deleteSculpture,
} = require("../controllers/sculptureController");

// =====================================================
// GET ALL SCULPTURES
// =====================================================

router.get("/", getSculptures);

// =====================================================
// GET SINGLE SCULPTURE
// =====================================================

router.get("/:id", getSculptureById);

// =====================================================
// CREATE SCULPTURE
// =====================================================
// Accept:
// image         -> main image
// galleryImages -> multiple gallery images

router.post(
  "/",
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
    {
      name: "galleryImages",
      maxCount: 10,
    },
  ]),
  createSculpture
);

// =====================================================
// UPDATE SCULPTURE
// =====================================================

router.put(
  "/:id",
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
    {
      name: "galleryImages",
      maxCount: 10,
    },
  ]),
  updateSculpture
);

// =====================================================
// DELETE SCULPTURE
// =====================================================

router.delete(
  "/:id",
  deleteSculpture
);

module.exports = router;