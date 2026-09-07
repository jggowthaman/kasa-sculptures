const bcrypt = require("bcryptjs");
require("dotenv").config();

const { pool } = require("./config/db");

const updateAdmin = async () => {
  try {
    // ==========================================
    // CLIENT'S ONLY LOGIN
    // ==========================================
    const email = "kasaluxeofficial@gmail.com";
    const password = "KASA@5175";

    console.log("=================================");
    console.log("Database:", process.env.DB_NAME);
    console.log("Updating admin login...");

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Get the existing admin
    const [admins] = await pool.execute(
      "SELECT id FROM admins LIMIT 1"
    );

    if (admins.length === 0) {
      // No admin exists → create one
      await pool.execute(
        `INSERT INTO admins (email, password)
         VALUES (?, ?)`,
        [email, hashedPassword]
      );

      console.log("Admin created successfully.");
    } else {
      // Admin exists → replace email + password
      await pool.execute(
        `UPDATE admins
         SET email = ?,
             password = ?
         WHERE id = ?`,
        [
          email,
          hashedPassword,
          admins[0].id,
        ]
      );

      console.log("Admin updated successfully.");
    }

    console.log("=================================");
    console.log("Email:", email);
    console.log("Admin login is ready.");
    console.log("=================================");

    await pool.end();
    process.exit(0);

  } catch (error) {
    console.error("=================================");
    console.error("ADMIN ERROR");
    console.error("Message:", error.message);
    console.error("Code:", error.code);
    console.error("=================================");

    await pool.end();
    process.exit(1);
  }
};

updateAdmin();