const { pool } = require("../config/db");

// =====================================================
// GET ADMIN DASHBOARD
// =====================================================

const getDashboard = async (req, res) => {
  try {
    // =================================================
    // TOTAL SCULPTURES
    // =================================================

    const [sculptureCount] = await pool.execute(`
      SELECT COUNT(*) AS total
      FROM sculptures
    `);

    // =================================================
    // TOTAL CATEGORIES
    // =================================================

    const [categoryCount] = await pool.execute(`
      SELECT COUNT(*) AS total
      FROM categories
    `);

    // =================================================
    // TOTAL ENQUIRIES
    // =================================================

    const [enquiryCount] = await pool.execute(`
      SELECT COUNT(*) AS total
      FROM enquiries
    `);

    // =================================================
    // ACTIVE SCULPTURES
    // =================================================

    const [activeSculptures] = await pool.execute(`
      SELECT COUNT(*) AS total
      FROM sculptures
      WHERE status = 'Active'
    `);

    // =================================================
    // FEATURED SCULPTURES
    // =================================================

    const [featuredSculptures] = await pool.execute(`
      SELECT COUNT(*) AS total
      FROM sculptures
      WHERE featured = 1
    `);

    // =================================================
    // TOTAL SERVICES
    // =================================================

    const [serviceCount] = await pool.execute(`
      SELECT COUNT(*) AS total
      FROM services
    `);

    // =================================================
    // ACTIVE SERVICES
    // =================================================

    const [activeServices] = await pool.execute(`
      SELECT COUNT(*) AS total
      FROM services
      WHERE status = 'Active'
    `);

    // =================================================
    // NEW ENQUIRIES
    // =================================================

    const [newEnquiries] = await pool.execute(`
      SELECT COUNT(*) AS total
      FROM enquiries
      WHERE status = 'New'
    `);

    // =================================================
    // RECENT SCULPTURES
    // =================================================

    const [recentSculptures] = await pool.execute(`
      SELECT
        s.id,
        s.name,
        s.category_id,
        c.name AS category,
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
      LIMIT 5
    `);

    // =================================================
    // RECENT ENQUIRIES
    // =================================================

    const [recentEnquiries] = await pool.execute(`
      SELECT
        e.id,
        e.name,
        e.phone,
        e.email,
        e.subject,
        e.message,
        e.sculpture_id,
        s.name AS sculpture_name,
        e.status,
        e.created_at,
        e.updated_at
      FROM enquiries e
      LEFT JOIN sculptures s
        ON e.sculpture_id = s.id
      ORDER BY e.id DESC
      LIMIT 5
    `);

    // =================================================
    // RESPONSE
    // =================================================

    return res.status(200).json({
      success: true,

      stats: {
        totalSculptures: Number(
          sculptureCount[0].total
        ),

        totalCategories: Number(
          categoryCount[0].total
        ),

        totalEnquiries: Number(
          enquiryCount[0].total
        ),

        activeSculptures: Number(
          activeSculptures[0].total
        ),

        featuredSculptures: Number(
          featuredSculptures[0].total
        ),

        totalServices: Number(
          serviceCount[0].total
        ),

        activeServices: Number(
          activeServices[0].total
        ),

        newEnquiries: Number(
          newEnquiries[0].total
        ),
      },

      recentSculptures,

      recentEnquiries,
    });
  } catch (error) {
    console.error(
      "GET DASHBOARD ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to load dashboard data.",
    });
  }
};

// =====================================================
// EXPORT
// =====================================================

module.exports = {
  getDashboard,
};