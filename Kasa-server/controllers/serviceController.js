const { pool } = require("../config/db");

// =====================================================
// GET ALL SERVICES
// =====================================================

const getServices = async (req, res) => {
  try {
    const [services] = await pool.execute(`
      SELECT
        id,
        title,
        description,
        image,
        status,
        created_at,
        updated_at
      FROM services
      ORDER BY id DESC
    `);

    res.status(200).json({
      success: true,
      services,
    });
  } catch (error) {
    console.error("GET SERVICES ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// GET SINGLE SERVICE
// =====================================================

const getServiceById = async (req, res) => {
  try {
    const serviceId = Number(req.params.id);

    if (
      !Number.isInteger(serviceId) ||
      serviceId <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid service ID.",
      });
    }

    const [services] = await pool.execute(
      `
      SELECT
        id,
        title,
        description,
        image,
        status,
        created_at,
        updated_at
      FROM services
      WHERE id = ?
      `,
      [serviceId]
    );

    if (services.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Service not found.",
      });
    }

    res.status(200).json({
      success: true,
      service: services[0],
    });
  } catch (error) {
    console.error(
      "GET SERVICE ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// CREATE SERVICE
// =====================================================

const createService = async (req, res) => {
  try {
    console.log(
      "CREATE SERVICE BODY:",
      req.body
    );

    console.log(
      "CREATE SERVICE FILE:",
      req.file
    );

    const {
      title,
      description,
      status,
    } = req.body;

    // =================================================
    // TITLE VALIDATION
    // =================================================

    if (
      !title ||
      !title.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Service title is required.",
      });
    }

    // =================================================
    // DESCRIPTION VALIDATION
    // =================================================

    if (
      !description ||
      !description.trim()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Service description is required.",
      });
    }

    // =================================================
    // STATUS
    // =================================================

    const serviceStatus =
      status === "Inactive"
        ? "Inactive"
        : "Active";

    // =================================================
    // IMAGE
    // =================================================

    let imagePath = null;

    if (req.file) {
      imagePath =
        `/uploads/services/${req.file.filename}`;
    }

    // =================================================
    // INSERT
    // =================================================

    const [result] = await pool.execute(
      `
      INSERT INTO services
      (
        title,
        description,
        image,
        status
      )
      VALUES (?, ?, ?, ?)
      `,
      [
        title.trim(),
        description.trim(),
        imagePath,
        serviceStatus,
      ]
    );

    // =================================================
    // GET CREATED SERVICE
    // =================================================

    const [newServices] =
      await pool.execute(
        `
        SELECT
          id,
          title,
          description,
          image,
          status,
          created_at,
          updated_at
        FROM services
        WHERE id = ?
        `,
        [result.insertId]
      );

    res.status(201).json({
      success: true,
      message:
        "Service created successfully.",
      service: newServices[0],
    });
  } catch (error) {
    console.error(
      "CREATE SERVICE ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// UPDATE SERVICE
// =====================================================

const updateService = async (req, res) => {
  try {
    const serviceId = Number(
      req.params.id
    );

    const {
      title,
      description,
      status,
    } = req.body;

    // =================================================
    // ID VALIDATION
    // =================================================

    if (
      !Number.isInteger(serviceId) ||
      serviceId <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid service ID.",
      });
    }

    // =================================================
    // TITLE
    // =================================================

    if (
      !title ||
      !title.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Service title is required.",
      });
    }

    // =================================================
    // DESCRIPTION
    // =================================================

    if (
      !description ||
      !description.trim()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Service description is required.",
      });
    }

    // =================================================
    // CHECK SERVICE
    // =================================================

    const [services] =
      await pool.execute(
        `
        SELECT
          id,
          image
        FROM services
        WHERE id = ?
        `,
        [serviceId]
      );

    if (services.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Service not found.",
      });
    }

    // =================================================
    // STATUS
    // =================================================

    const serviceStatus =
      status === "Inactive"
        ? "Inactive"
        : "Active";

    // =================================================
    // IMAGE
    // =================================================

    let imagePath =
      services[0].image || null;

    if (req.file) {
      imagePath =
        `/uploads/services/${req.file.filename}`;
    }

    // =================================================
    // UPDATE
    // =================================================

    await pool.execute(
      `
      UPDATE services
      SET
        title = ?,
        description = ?,
        image = ?,
        status = ?
      WHERE id = ?
      `,
      [
        title.trim(),
        description.trim(),
        imagePath,
        serviceStatus,
        serviceId,
      ]
    );

    // =================================================
    // GET UPDATED SERVICE
    // =================================================

    const [updatedServices] =
      await pool.execute(
        `
        SELECT
          id,
          title,
          description,
          image,
          status,
          created_at,
          updated_at
        FROM services
        WHERE id = ?
        `,
        [serviceId]
      );

    res.status(200).json({
      success: true,
      message:
        "Service updated successfully.",
      service: updatedServices[0],
    });
  } catch (error) {
    console.error(
      "UPDATE SERVICE ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// DELETE SERVICE
// =====================================================

const deleteService = async (req, res) => {
  try {
    const serviceId = Number(
      req.params.id
    );

    if (
      !Number.isInteger(serviceId) ||
      serviceId <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid service ID.",
      });
    }

    // =================================================
    // CHECK SERVICE
    // =================================================

    const [services] =
      await pool.execute(
        `
        SELECT id
        FROM services
        WHERE id = ?
        `,
        [serviceId]
      );

    if (services.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Service not found.",
      });
    }

    // =================================================
    // DELETE
    // =================================================

    await pool.execute(
      `
      DELETE FROM services
      WHERE id = ?
      `,
      [serviceId]
    );

    res.status(200).json({
      success: true,
      message:
        "Service deleted successfully.",
    });
  } catch (error) {
    console.error(
      "DELETE SERVICE ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// EXPORT
// =====================================================

module.exports = {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
};