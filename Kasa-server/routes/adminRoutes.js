const express = require("express");
const { loginAdmin } = require("../controllers/adminController");
const dashboardController = require("../controllers/dashboardController");

const router = express.Router();

router.post("/login", loginAdmin);

router.get(
  "/dashboard",
  dashboardController.getDashboard
);

module.exports = router;