const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const { connectDB } = require("./config/db");

// =====================================================
// ROUTES
// =====================================================

const adminRoutes = require("./routes/adminRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const sculptureRoutes = require("./routes/sculptureRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const enquiryRoutes = require("./routes/enquiryRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

// =====================================================
// APP
// =====================================================

const app = express();

const PORT = process.env.PORT || 5000;

// =====================================================
// MIDDLEWARE
// =====================================================

app.use(
  cors({
   origin: [
  "http://localhost:5173",
  "https://kasa-luxe.com",
  "https://www.kasa-luxe.com",
],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =====================================================
// STATIC UPLOADS
// =====================================================

app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);

// =====================================================
// TEST ROUTE
// =====================================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "KASA LUXE Server is running",
  });
});

// =====================================================
// API ROUTES
// =====================================================

app.use("/api/admin", adminRoutes);

app.use(
  "/api/categories",
  categoryRoutes
);

app.use(
  "/api/sculptures",
  sculptureRoutes
);

app.use(
  "/api/services",
  serviceRoutes
);

app.use(
  "/api/enquiries",
  enquiryRoutes
);

app.use(
  "/api/dashboard",
  dashboardRoutes
);

// =====================================================
// 404 HANDLER
// =====================================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

// =====================================================
// ERROR HANDLER
// =====================================================

app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err);

  if (err.name === "MulterError") {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  res.status(500).json({
    success: false,
    message:
      err.message || "Internal server error",
  });
});

// =====================================================
// START SERVER
// =====================================================

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(
        `KASA LUXE Server running on http://localhost:${PORT}`
      );

      console.log(
        `Uploads available at http://localhost:${PORT}/uploads`
      );

      console.log(
        `Services API available at http://localhost:${PORT}/api/services`
      );
    });
  } catch (error) {
    console.error(
      "FAILED TO START SERVER:",
      error
    );

    process.exit(1);
  }
};

startServer();