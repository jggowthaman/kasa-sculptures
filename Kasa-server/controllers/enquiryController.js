const { pool } = require("../config/db");

// =====================================================
// CREATE ENQUIRY
// =====================================================

const createEnquiry = async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      subject,
      message,
      sculpture_id,
    } = req.body;

    // =================================================
    // VALIDATION
    // =================================================

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Name is required.",
      });
    }

    if (!phone || !phone.trim()) {
      return res.status(400).json({
        success: false,
        message: "Phone number is required.",
      });
    }

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required.",
      });
    }

    // =================================================
    // EMAIL VALIDATION
    // =================================================

    if (email && email.trim()) {
      const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email.trim())) {
        return res.status(400).json({
          success: false,
          message: "Invalid email address.",
        });
      }
    }

    // =================================================
    // SCULPTURE ID
    // =================================================

    let sculptureId = null;

    if (
      sculpture_id !== undefined &&
      sculpture_id !== null &&
      sculpture_id !== ""
    ) {
      sculptureId = Number(sculpture_id);

      if (
        !Number.isInteger(sculptureId) ||
        sculptureId <= 0
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid sculpture ID.",
        });
      }

      // Check sculpture exists
      const [sculptures] =
        await pool.execute(
          `
          SELECT id
          FROM sculptures
          WHERE id = ?
          `,
          [sculptureId]
        );

      if (sculptures.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Sculpture does not exist.",
        });
      }
    }

    // =================================================
    // INSERT ENQUIRY
    // =================================================

    const [result] =
      await pool.execute(
        `
        INSERT INTO enquiries
        (
          name,
          phone,
          email,
          subject,
          message,
          sculpture_id,
          status
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
        `,
        [
          name.trim(),
          phone.trim(),
          email?.trim() || null,
          subject?.trim() || null,
          message.trim(),
          sculptureId,
          "New",
        ]
      );

    // =================================================
    // GET CREATED ENQUIRY
    // =================================================

    const [enquiries] =
      await pool.execute(
        `
        SELECT
          e.id,
          e.name,
          e.phone,
          e.email,
          e.subject,
          e.message,
          e.sculpture_id,
          s.name AS sculpture_name,
          s.image AS sculpture_image,
          e.status,
          e.created_at,
          e.updated_at
        FROM enquiries e
        LEFT JOIN sculptures s
          ON e.sculpture_id = s.id
        WHERE e.id = ?
        `,
        [result.insertId]
      );

    return res.status(201).json({
      success: true,
      message:
        "Enquiry submitted successfully.",
      enquiry: enquiries[0],
    });
  } catch (error) {
    console.error(
      "CREATE ENQUIRY ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to create enquiry.",
    });
  }
};

// =====================================================
// GET ALL ENQUIRIES
// =====================================================

const getEnquiries = async (req, res) => {
  try {
    const [enquiries] =
      await pool.execute(
        `
        SELECT
          e.id,
          e.name,
          e.phone,
          e.email,
          e.subject,
          e.message,
          e.sculpture_id,
          s.name AS sculpture_name,
          s.image AS sculpture_image,
          e.status,
          e.created_at,
          e.updated_at
        FROM enquiries e
        LEFT JOIN sculptures s
          ON e.sculpture_id = s.id
        ORDER BY e.id DESC
        `
      );

    return res.status(200).json({
      success: true,
      enquiries,
    });
  } catch (error) {
    console.error(
      "GET ENQUIRIES ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to fetch enquiries.",
    });
  }
};

// =====================================================
// GET SINGLE ENQUIRY
// =====================================================

const getEnquiryById = async (req, res) => {
  try {
    const enquiryId = Number(
      req.params.id
    );

    if (
      !Number.isInteger(enquiryId) ||
      enquiryId <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid enquiry ID.",
      });
    }

    const [enquiries] =
      await pool.execute(
        `
        SELECT
          e.id,
          e.name,
          e.phone,
          e.email,
          e.subject,
          e.message,
          e.sculpture_id,
          s.name AS sculpture_name,
          s.image AS sculpture_image,
          e.status,
          e.created_at,
          e.updated_at
        FROM enquiries e
        LEFT JOIN sculptures s
          ON e.sculpture_id = s.id
        WHERE e.id = ?
        `,
        [enquiryId]
      );

    if (enquiries.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found.",
      });
    }

    return res.status(200).json({
      success: true,
      enquiry: enquiries[0],
    });
  } catch (error) {
    console.error(
      "GET ENQUIRY ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to fetch enquiry.",
    });
  }
};

// =====================================================
// UPDATE ENQUIRY STATUS
// =====================================================

const updateEnquiry = async (req, res) => {
  try {
    const enquiryId = Number(
      req.params.id
    );

    const { status } = req.body;

    // =================================================
    // ID VALIDATION
    // =================================================

    if (
      !Number.isInteger(enquiryId) ||
      enquiryId <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid enquiry ID.",
      });
    }

    // =================================================
    // STATUS VALIDATION
    // =================================================

    if (
      status !== "New" &&
      status !== "Read"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Status must be New or Read.",
      });
    }

    // =================================================
    // CHECK ENQUIRY
    // =================================================

    const [existing] =
      await pool.execute(
        `
        SELECT id
        FROM enquiries
        WHERE id = ?
        `,
        [enquiryId]
      );

    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found.",
      });
    }

    // =================================================
    // UPDATE STATUS
    // =================================================

    await pool.execute(
      `
      UPDATE enquiries
      SET status = ?
      WHERE id = ?
      `,
      [status, enquiryId]
    );

    // =================================================
    // GET UPDATED ENQUIRY
    // =================================================

    const [updated] =
      await pool.execute(
        `
        SELECT
          e.id,
          e.name,
          e.phone,
          e.email,
          e.subject,
          e.message,
          e.sculpture_id,
          s.name AS sculpture_name,
          s.image AS sculpture_image,
          e.status,
          e.created_at,
          e.updated_at
        FROM enquiries e
        LEFT JOIN sculptures s
          ON e.sculpture_id = s.id
        WHERE e.id = ?
        `,
        [enquiryId]
      );

    return res.status(200).json({
      success: true,
      message:
        "Enquiry status updated successfully.",
      enquiry: updated[0],
    });
  } catch (error) {
    console.error(
      "UPDATE ENQUIRY ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to update enquiry.",
    });
  }
};

// =====================================================
// DELETE ENQUIRY
// =====================================================

const deleteEnquiry = async (req, res) => {
  try {
    const enquiryId = Number(
      req.params.id
    );

    // =================================================
    // ID VALIDATION
    // =================================================

    if (
      !Number.isInteger(enquiryId) ||
      enquiryId <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid enquiry ID.",
      });
    }

    // =================================================
    // CHECK ENQUIRY
    // =================================================

    const [existing] =
      await pool.execute(
        `
        SELECT id
        FROM enquiries
        WHERE id = ?
        `,
        [enquiryId]
      );

    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found.",
      });
    }

    // =================================================
    // DELETE
    // =================================================

    await pool.execute(
      `
      DELETE FROM enquiries
      WHERE id = ?
      `,
      [enquiryId]
    );

    return res.status(200).json({
      success: true,
      message:
        "Enquiry deleted successfully.",
    });
  } catch (error) {
    console.error(
      "DELETE ENQUIRY ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to delete enquiry.",
    });
  }
};

// =====================================================
// EXPORT
// =====================================================

module.exports = {
  createEnquiry,
  getEnquiries,
  getEnquiryById,
  updateEnquiry,
  deleteEnquiry,
};