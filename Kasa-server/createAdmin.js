const bcrypt = require("bcryptjs");
require("dotenv").config();

const { pool } = require("./config/db");

const createOrUpdateAdmin = async () => {
  try {
    // ==========================================
    // EXISTING ADMIN EMAIL IN DATABASE
    // ==========================================
    const oldEmail = "admin@kasaluxe.com";

    // ==========================================
    // CLIENT'S NEW LOGIN DETAILS
    // ==========================================
    const newEmail = "kasaluxeofficial@gmail.com";
    const newPassword = "KASA@5175";

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Check existing admin
    const [existingAdmin] = await pool.execute(
      "SELECT id FROM admins WHERE email = ?",
      [oldEmail]
    );

    // ==========================================
    // UPDATE EXISTING ADMIN
    // ==========================================
    if (existingAdmin.length > 0) {
      const adminId = existingAdmin[0].id;

      await pool.execute(
        `UPDATE admins
         SET email = ?,
             password = ?
         WHERE id = ?`,
        [newEmail, hashedPassword, adminId]
      );

      console.log("=================================");
      console.log("Admin updated successfully.");
      console.log("Admin ID:", adminId);
      console.log("New Email:", newEmail);
      console.log("=================================");

      process.exit(0);
    }

    // ==========================================
    // CREATE NEW ADMIN IF OLD ADMIN NOT FOUND
    // ==========================================
    await pool.execute(
      `INSERT INTO admins (email, password)
       VALUES (?, ?)`,
      [newEmail, hashedPassword]
    );

    console.log("=================================");
    console.log("New admin created successfully.");
    console.log("Email:", newEmail);
    console.log("=================================");

    process.exit(0);
  } catch (error) {
    console.error("=================================");
    console.error("Admin update/create error:");
    console.error(error.message);
    console.error("=================================");

    process.exit(1);
  }
};

createOrUpdateAdmin();