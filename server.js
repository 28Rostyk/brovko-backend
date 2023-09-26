const mongoose = require("mongoose");
require("colors");

const app = require("./app");
require("dotenv").config();

const { DB_HOST, PORT } = process.env;

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT);
    console.log("Server is running on port:".brightBlue, `${PORT}`.yellow);
    console.log("Database connection successful".brightGreen);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
