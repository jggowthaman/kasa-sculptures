const bcrypt = require("bcryptjs");
require("dotenv").config();

const { pool } = require("./config/db");

const createAdmin = async () => {
  try {
    const email = "admin@kasaluxe.com";
    const password = "Admin@123";

    // Hash password
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    // Check if admin already exists
    const [existingAdmin] = await pool.execute(
      "SELECT id FROM admins WHERE email = ?",
      [email]
    );

    if (existingAdmin.length > 0) {
      console.log("Admin already exists.");
      process.exit();
    }

    // Insert admin
    await pool.execute(
      "INSERT INTO admins (email, password) VALUES (?, ?)",
      [email, hashedPassword]
    );

    console.log("Admin created successfully.");
    console.log("Email:", email);
    console.log("Password:", password);

    process.exit();
  } catch (error) {
    console.error(
      "Error creating admin:",
      error.message
    );

    process.exit(1);
  }
};

createAdmin();