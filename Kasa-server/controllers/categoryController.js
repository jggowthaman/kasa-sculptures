const { pool } = require("../config/db");

// ======================================================
// GET ALL CATEGORIES
// ======================================================
const getCategories = async (req, res) => {
  try {
    const [categories] = await pool.execute(
      `SELECT
        id,
        name,
        description,
        image,
        status,
        created_at,
        updated_at
       FROM categories
       ORDER BY id DESC`
    );

    res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    console.error("========== GET CATEGORIES ERROR ==========");
    console.error("Message:", error.message);
    console.error("Code:", error.code);
    console.error("SQL State:", error.sqlState);
    console.error("Stack:", error.stack);
    console.error("===========================================");

    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch categories.",
    });
  }
};

// ======================================================
// GET CATEGORY BY ID
// ======================================================
const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const [categories] = await pool.execute(
      `SELECT
        id,
        name,
        description,
        image,
        status,
        created_at,
        updated_at
       FROM categories
       WHERE id = ?`,
      [id]
    );

    if (categories.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      });
    }

    res.status(200).json({
      success: true,
      category: categories[0],
    });
  } catch (error) {
    console.error("========== GET CATEGORY ERROR ==========");
    console.error("Message:", error.message);
    console.error("Code:", error.code);
    console.error("SQL State:", error.sqlState);
    console.error("Stack:", error.stack);
    console.error("=========================================");

    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch category.",
    });
  }
};

// ======================================================
// CREATE CATEGORY
// ======================================================
const createCategory = async (req, res) => {
  try {
    const { name, description, status } = req.body;

    // Check category name
    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Category name is required.",
      });
    }

    const categoryName = name.trim();

    // Check duplicate category
    const [existingCategory] = await pool.execute(
      `SELECT id
       FROM categories
       WHERE LOWER(name) = LOWER(?)`,
      [categoryName]
    );

    if (existingCategory.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Category already exists.",
      });
    }

    // Only allow Active / Inactive
    const categoryStatus =
      status === "Inactive" ? "Inactive" : "Active";

    // Image path
    const image = req.file
      ? `uploads/categories/${req.file.filename}`
      : null;

    console.log("========== CREATE CATEGORY ==========");
    console.log("Name:", categoryName);
    console.log("Description:", description);
    console.log("Status:", categoryStatus);
    console.log("File:", req.file);
    console.log("Image:", image);
    console.log("====================================");

    // Insert category
    const [result] = await pool.execute(
      `INSERT INTO categories
       (name, description, image, status)
       VALUES (?, ?, ?, ?)`,
      [
        categoryName,
        description?.trim() || null,
        image,
        categoryStatus,
      ]
    );

    // Get newly created category
    const [newCategory] = await pool.execute(
      `SELECT
        id,
        name,
        description,
        image,
        status,
        created_at,
        updated_at
       FROM categories
       WHERE id = ?`,
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      message: "Category created successfully.",
      category: newCategory[0],
    });
  } catch (error) {
    console.error("========== CREATE CATEGORY ERROR ==========");
    console.error("Message:", error.message);
    console.error("Code:", error.code);
    console.error("SQL State:", error.sqlState);
    console.error("Stack:", error.stack);
    console.error("============================================");

    res.status(500).json({
      success: false,
      message: error.message || "Failed to create category.",
    });
  }
};

// ======================================================
// UPDATE CATEGORY
// ======================================================
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, status } = req.body;

    console.log("========== UPDATE CATEGORY ==========");
    console.log("Category ID:", id);
    console.log("Request Body:", req.body);
    console.log("Uploaded File:", req.file);

    // Check category name
    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Category name is required.",
      });
    }

    const categoryName = name.trim();

    // Get existing category
    const [existingCategory] = await pool.execute(
      `SELECT
        id,
        name,
        image
       FROM categories
       WHERE id = ?`,
      [id]
    );

    if (existingCategory.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      });
    }

    // Check duplicate name
    const [duplicateCategory] = await pool.execute(
      `SELECT id
       FROM categories
       WHERE LOWER(name) = LOWER(?)
       AND id != ?`,
      [categoryName, id]
    );

    if (duplicateCategory.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Another category with this name already exists.",
      });
    }

    // Status
    const categoryStatus =
      status === "Inactive" ? "Inactive" : "Active";

    // Keep old image if no new image is selected
    let image = existingCategory[0].image || null;

    // If new image uploaded, replace old image path
    if (req.file) {
      image = `uploads/categories/${req.file.filename}`;
    }

    console.log("Category Name:", categoryName);
    console.log("Description:", description);
    console.log("Status:", categoryStatus);
    console.log("Final Image:", image);

    // Update category
    const [result] = await pool.execute(
      `UPDATE categories
       SET
        name = ?,
        description = ?,
        image = ?,
        status = ?
       WHERE id = ?`,
      [
        categoryName,
        description?.trim() || null,
        image,
        categoryStatus,
        id,
      ]
    );

    console.log("UPDATE RESULT:", result);

    // Get updated category
    const [updatedCategory] = await pool.execute(
      `SELECT
        id,
        name,
        description,
        image,
        status,
        created_at,
        updated_at
       FROM categories
       WHERE id = ?`,
      [id]
    );

    console.log("UPDATED CATEGORY:", updatedCategory[0]);
    console.log("====================================");

    res.status(200).json({
      success: true,
      message: "Category updated successfully.",
      category: updatedCategory[0],
    });
  } catch (error) {
    // IMPORTANT:
    // This prints the REAL database/server error
    console.error("========== UPDATE CATEGORY ERROR ==========");
    console.error("Message:", error.message);
    console.error("Code:", error.code);
    console.error("SQL State:", error.sqlState);
    console.error("Stack:", error.stack);
    console.error("============================================");

    res.status(500).json({
      success: false,
      message: error.message || "Failed to update category.",
    });
  }
};

// ======================================================
// DELETE CATEGORY
// ======================================================
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Check category exists
    const [category] = await pool.execute(
      `SELECT
        id,
        name
       FROM categories
       WHERE id = ?`,
      [id]
    );

    if (category.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      });
    }

    // Check sculptures using this category
    const [sculptures] = await pool.execute(
      `SELECT COUNT(*) AS count
       FROM sculptures
       WHERE category_id = ?`,
      [id]
    );

    if (sculptures[0].count > 0) {
      return res.status(409).json({
        success: false,
        message:
          "Cannot delete this category because sculptures are assigned to it.",
        sculptureCount: sculptures[0].count,
      });
    }

    // Delete category
    await pool.execute(
      `DELETE FROM categories
       WHERE id = ?`,
      [id]
    );

    res.status(200).json({
      success: true,
      message: "Category deleted successfully.",
    });
  } catch (error) {
    console.error("========== DELETE CATEGORY ERROR ==========");
    console.error("Message:", error.message);
    console.error("Code:", error.code);
    console.error("SQL State:", error.sqlState);
    console.error("Stack:", error.stack);
    console.error("============================================");

    res.status(500).json({
      success: false,
      message: error.message || "Failed to delete category.",
    });
  }
};

// ======================================================
// EXPORT
// ======================================================
module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};