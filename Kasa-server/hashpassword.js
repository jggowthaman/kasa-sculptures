const bcrypt = require("bcryptjs");

const password = "KASA@5175";

const generateHash = async () => {
  const hash = await bcrypt.hash(password, 10);

  console.log("Password hash:");
  console.log(hash);

  process.exit(0);
};

generateHash();