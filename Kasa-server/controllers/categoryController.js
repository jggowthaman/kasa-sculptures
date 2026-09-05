const { pool } = require("../config/db");

// =====================================================
// GET ALL CATEGORIES
// =====================================================

const getCategories = async (req, res) => {
  try {
    const [categories] = await pool.execute(
      `SELECT 
        id,
        name,
        description,
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
    console.error("Get Categories Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch categories.",
    });
  }
};

// =====================================================
// GET SINGLE CATEGORY
// =====================================================

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const [categories] = await pool.execute(
      `SELECT 
        id,
        name,
        description,
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
    console.error("Get Category Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch category.",
    });
  }
};

// =====================================================
// CREATE CATEGORY
// =====================================================

const createCategory = async (req, res) => {
  try {
    const { name, description, status } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Category name is required.",
      });
    }

    const categoryName = name.trim();

    // Check duplicate
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

    const categoryStatus =
      status === "Inactive" ? "Inactive" : "Active";

    const [result] = await pool.execute(
      `INSERT INTO categories
       (name, description, status)
       VALUES (?, ?, ?)`,
      [
        categoryName,
        description?.trim() || null,
        categoryStatus,
      ]
    );

    const [newCategory] = await pool.execute(
      `SELECT *
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
    console.error("Create Category Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create category.",
    });
  }
};

// =====================================================
// UPDATE CATEGORY
// =====================================================

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, status } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Category name is required.",
      });
    }

    const categoryName = name.trim();

    // Check category exists
    const [existingCategory] = await pool.execute(
      `SELECT id
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

    const categoryStatus =
      status === "Inactive" ? "Inactive" : "Active";

    await pool.execute(
      `UPDATE categories
       SET name = ?,
           description = ?,
           status = ?
       WHERE id = ?`,
      [
        categoryName,
        description?.trim() || null,
        categoryStatus,
        id,
      ]
    );

    const [updatedCategory] = await pool.execute(
      `SELECT *
       FROM categories
       WHERE id = ?`,
      [id]
    );

    res.status(200).json({
      success: true,
      message: "Category updated successfully.",
      category: updatedCategory[0],
    });
  } catch (error) {
    console.error("Update Category Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update category.",
    });
  }
};

// =====================================================
// DELETE CATEGORY
// =====================================================

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Check category exists
    const [category] = await pool.execute(
      `SELECT id, name
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

    // Check whether sculptures are using this category
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
    console.error("Delete Category Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete category.",
    });
  }
};

// =====================================================
// EXPORT
// =====================================================

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};