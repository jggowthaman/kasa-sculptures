const express = require("express");

const {
  getDashboard,
} = require("../controllers/dashboardController");

const router = express.Router();

// =====================================================
// GET ADMIN DASHBOARD
// GET /api/dashboard
// =====================================================

router.get("/", getDashboard);

module.exports = router;