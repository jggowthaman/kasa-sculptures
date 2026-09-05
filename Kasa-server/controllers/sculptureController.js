const { pool } = require("../config/db");

// =====================================================
// GET ALL SCULPTURES
// =====================================================

const getSculptures = async (req, res) => {
  try {
    const [sculptures] = await pool.execute(`
      SELECT
        s.id,
        s.name,
        s.category_id,
        c.name AS category_name,
        s.description,
        s.material,
        s.height,
        s.price,
        s.image,
        s.status,
        s.featured,
        s.created_at,
        s.updated_at
      FROM sculptures s
      LEFT JOIN categories c
        ON s.category_id = c.id
      ORDER BY s.id DESC
    `);

    res.status(200).json({
      success: true,
      sculptures,
    });
  } catch (error) {
    console.error("GET SCULPTURES ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch sculptures.",
      error: error.message,
    });
  }
};

// =====================================================
// GET SINGLE SCULPTURE
// =====================================================

const getSculptureById = async (req, res) => {
  try {
    const sculptureId = Number(req.params.id);

    if (!Number.isInteger(sculptureId) || sculptureId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid sculpture ID.",
      });
    }

    // Get sculpture
    const [sculptures] = await pool.execute(
      `
      SELECT
        s.id,
        s.name,
        s.category_id,
        c.name AS category_name,
        s.description,
        s.material,
        s.height,
        s.price,
        s.image,
        s.status,
        s.featured,
        s.created_at,
        s.updated_at
      FROM sculptures s
      LEFT JOIN categories c
        ON s.category_id = c.id
      WHERE s.id = ?
      `,
      [sculptureId]
    );

    if (sculptures.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Sculpture not found.",
      });
    }

    // Get gallery images
    const [galleryImages] = await pool.execute(
      `
      SELECT
        id,
        sculpture_id,
        image,
        created_at
      FROM sculpture_images
      WHERE sculpture_id = ?
      ORDER BY id ASC
      `,
      [sculptureId]
    );

    res.status(200).json({
      success: true,
      sculpture: sculptures[0],
      galleryImages,
    });
  } catch (error) {
    console.error("GET SCULPTURE ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch sculpture.",
      error: error.message,
    });
  }
};

// =====================================================
// CREATE SCULPTURE
// =====================================================

const createSculpture = async (req, res) => {
  let connection;

  try {
    console.log("CREATE SCULPTURE BODY:", req.body);
    console.log("CREATE SCULPTURE FILES:", req.files);

    const {
      name,
      category_id,
      description,
      material,
      height,
      price,
      status,
      featured,
    } = req.body;

    // =================================================
    // VALIDATION
    // =================================================

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Sculpture name is required.",
      });
    }

    if (
      category_id === undefined ||
      category_id === null ||
      category_id === ""
    ) {
      return res.status(400).json({
        success: false,
        message: "Category is required.",
      });
    }

    const categoryId = Number(category_id);

    if (!Number.isInteger(categoryId) || categoryId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID.",
      });
    }

    const sculpturePrice = Number(price);

    if (
      price === undefined ||
      price === null ||
      price === "" ||
      Number.isNaN(sculpturePrice) ||
      sculpturePrice < 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Valid sculpture price is required.",
      });
    }

    // =================================================
    // CHECK CATEGORY
    // =================================================

    const [categories] = await pool.execute(
      `
      SELECT id
      FROM categories
      WHERE id = ?
      `,
      [categoryId]
    );

    if (categories.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Selected category does not exist.",
      });
    }

    // =================================================
    // STATUS
    // =================================================

    const sculptureStatus =
      status === "Inactive" ? "Inactive" : "Active";

    // =================================================
    // FEATURED
    // =================================================

    const isFeatured =
      featured === "1" ||
      featured === "true" ||
      featured === 1 ||
      featured === true
        ? 1
        : 0;

    // =================================================
    // MAIN IMAGE
    // =================================================

    let imagePath = null;

    if (
      req.files &&
      req.files.image &&
      req.files.image.length > 0
    ) {
      imagePath =
        `/uploads/sculptures/${req.files.image[0].filename}`;
    }

    // =================================================
    // DATABASE TRANSACTION
    // =================================================

    connection = await pool.getConnection();

    await connection.beginTransaction();

    // =================================================
    // INSERT SCULPTURE
    // =================================================

    const [result] = await connection.execute(
      `
      INSERT INTO sculptures
      (
        name,
        category_id,
        description,
        material,
        height,
        price,
        image,
        status,
        featured
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        name.trim(),
        categoryId,
        description?.trim() || null,
        material?.trim() || null,
        height?.trim() || null,
        sculpturePrice,
        imagePath,
        sculptureStatus,
        isFeatured,
      ]
    );

    const sculptureId = result.insertId;

    // =================================================
    // INSERT GALLERY IMAGES
    // =================================================

    if (
      req.files &&
      req.files.galleryImages &&
      req.files.galleryImages.length > 0
    ) {
      for (const file of req.files.galleryImages) {
        await connection.execute(
          `
          INSERT INTO sculpture_images
          (
            sculpture_id,
            image
          )
          VALUES (?, ?)
          `,
          [
            sculptureId,
            `/uploads/sculptures/${file.filename}`,
          ]
        );
      }
    }

    // =================================================
    // COMMIT
    // =================================================

    await connection.commit();

    // =================================================
    // GET CREATED SCULPTURE
    // =================================================

    const [newSculptures] = await pool.execute(
      `
      SELECT
        s.id,
        s.name,
        s.category_id,
        c.name AS category_name,
        s.description,
        s.material,
        s.height,
        s.price,
        s.image,
        s.status,
        s.featured,
        s.created_at,
        s.updated_at
      FROM sculptures s
      LEFT JOIN categories c
        ON s.category_id = c.id
      WHERE s.id = ?
      `,
      [sculptureId]
    );

    // =================================================
    // GET GALLERY IMAGES
    // =================================================

    const [galleryImages] = await pool.execute(
      `
      SELECT
        id,
        sculpture_id,
        image,
        created_at
      FROM sculpture_images
      WHERE sculpture_id = ?
      ORDER BY id ASC
      `,
      [sculptureId]
    );

    return res.status(201).json({
      success: true,
      message: "Sculpture created successfully.",
      sculpture: newSculptures[0],
      galleryImages,
    });
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }

    console.error("CREATE SCULPTURE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create sculpture.",
      error: error.message,
    });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

// =====================================================
// UPDATE SCULPTURE
// =====================================================

const updateSculpture = async (req, res) => {
  let connection;

  try {
    const sculptureId = Number(req.params.id);

    const {
      name,
      category_id,
      description,
      material,
      height,
      price,
      status,
      featured,
    } = req.body;

    // =================================================
    // VALIDATION
    // =================================================

    if (!Number.isInteger(sculptureId) || sculptureId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid sculpture ID.",
      });
    }

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Sculpture name is required.",
      });
    }

    const categoryId = Number(category_id);

    if (!Number.isInteger(categoryId) || categoryId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID.",
      });
    }

    const sculpturePrice = Number(price);

    if (
      price === undefined ||
      price === null ||
      price === "" ||
      Number.isNaN(sculpturePrice) ||
      sculpturePrice < 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Valid sculpture price is required.",
      });
    }

    // =================================================
    // CHECK SCULPTURE
    // =================================================

    const [existing] = await pool.execute(
      `
      SELECT id, image
      FROM sculptures
      WHERE id = ?
      `,
      [sculptureId]
    );

    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Sculpture not found.",
      });
    }

    // =================================================
    // CHECK CATEGORY
    // =================================================

    const [categories] = await pool.execute(
      `
      SELECT id
      FROM categories
      WHERE id = ?
      `,
      [categoryId]
    );

    if (categories.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Selected category does not exist.",
      });
    }

    // =================================================
    // STATUS
    // =================================================

    const sculptureStatus =
      status === "Inactive" ? "Inactive" : "Active";

    // =================================================
    // FEATURED
    // =================================================

    const isFeatured =
      featured === "1" ||
      featured === "true" ||
      featured === 1 ||
      featured === true
        ? 1
        : 0;

    // =================================================
    // MAIN IMAGE
    // =================================================

    let imagePath = existing[0].image || null;

    if (
      req.files &&
      req.files.image &&
      req.files.image.length > 0
    ) {
      imagePath =
        `/uploads/sculptures/${req.files.image[0].filename}`;
    }

    // =================================================
    // TRANSACTION
    // =================================================

    connection = await pool.getConnection();

    await connection.beginTransaction();

    // =================================================
    // UPDATE SCULPTURE
    // =================================================

    await connection.execute(
      `
      UPDATE sculptures
      SET
        name = ?,
        category_id = ?,
        description = ?,
        material = ?,
        height = ?,
        price = ?,
        image = ?,
        status = ?,
        featured = ?
      WHERE id = ?
      `,
      [
        name.trim(),
        categoryId,
        description?.trim() || null,
        material?.trim() || null,
        height?.trim() || null,
        sculpturePrice,
        imagePath,
        sculptureStatus,
        isFeatured,
        sculptureId,
      ]
    );

    // =================================================
    // ADD NEW GALLERY IMAGES
    // =================================================

    if (
      req.files &&
      req.files.galleryImages &&
      req.files.galleryImages.length > 0
    ) {
      for (const file of req.files.galleryImages) {
        await connection.execute(
          `
          INSERT INTO sculpture_images
          (
            sculpture_id,
            image
          )
          VALUES (?, ?)
          `,
          [
            sculptureId,
            `/uploads/sculptures/${file.filename}`,
          ]
        );
      }
    }

    await connection.commit();

    // =================================================
    // GET UPDATED SCULPTURE
    // =================================================

    const [updatedSculptures] =
      await pool.execute(
        `
        SELECT
          s.id,
          s.name,
          s.category_id,
          c.name AS category_name,
          s.description,
          s.material,
          s.height,
          s.price,
          s.image,
          s.status,
          s.featured,
          s.created_at,
          s.updated_at
        FROM sculptures s
        LEFT JOIN categories c
          ON s.category_id = c.id
        WHERE s.id = ?
        `,
        [sculptureId]
      );

    // =================================================
    // GET GALLERY IMAGES
    // =================================================

    const [galleryImages] =
      await pool.execute(
        `
        SELECT
          id,
          sculpture_id,
          image,
          created_at
        FROM sculpture_images
        WHERE sculpture_id = ?
        ORDER BY id ASC
        `,
        [sculptureId]
      );

    res.status(200).json({
      success: true,
      message: "Sculpture updated successfully.",
      sculpture: updatedSculptures[0],
      galleryImages,
    });
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }

    console.error("UPDATE SCULPTURE ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update sculpture.",
      error: error.message,
    });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

// =====================================================
// DELETE SCULPTURE
// =====================================================

const deleteSculpture = async (req, res) => {
  try {
    const sculptureId = Number(req.params.id);

    if (!Number.isInteger(sculptureId) || sculptureId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid sculpture ID.",
      });
    }

    const [sculptures] = await pool.execute(
      `
      SELECT id
      FROM sculptures
      WHERE id = ?
      `,
      [sculptureId]
    );

    if (sculptures.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Sculpture not found.",
      });
    }

    await pool.execute(
      `
      DELETE FROM sculptures
      WHERE id = ?
      `,
      [sculptureId]
    );

    res.status(200).json({
      success: true,
      message: "Sculpture deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE SCULPTURE ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete sculpture.",
      error: error.message,
    });
  }
};

// =====================================================
// EXPORT
// =====================================================

module.exports = {
  getSculptures,
  getSculptureById,
  createSculpture,
  updateSculpture,
  deleteSculpture,
};