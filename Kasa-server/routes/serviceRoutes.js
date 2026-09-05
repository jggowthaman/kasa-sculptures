const express = require("express");

const {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} = require("../controllers/serviceController");

const serviceUpload = require("../middleware/serviceUpload");

const router = express.Router();

router.get("/", getServices);

router.get("/:id", getServiceById);

router.post(
  "/",
  serviceUpload.single("image"),
  createService
);

router.put(
  "/:id",
  serviceUpload.single("image"),
  updateService
);

router.delete(
  "/:id",
  deleteService
);

module.exports = router;