const express = require("express");

const {
  createEnquiry,
  getEnquiries,
  getEnquiryById,
  updateEnquiry,
  deleteEnquiry,
} = require("../controllers/enquiryController");

const router = express.Router();

// =====================================================
// CREATE ENQUIRY
// =====================================================

router.post("/", createEnquiry);

// =====================================================
// GET ALL ENQUIRIES
// =====================================================

router.get("/", getEnquiries);

// =====================================================
// GET SINGLE ENQUIRY
// =====================================================

router.get("/:id", getEnquiryById);

// =====================================================
// UPDATE ENQUIRY STATUS
// =====================================================

router.put("/:id", updateEnquiry);

// =====================================================
// DELETE ENQUIRY
// =====================================================

router.delete("/:id", deleteEnquiry);

module.exports = router;