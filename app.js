require("dotenv").config();
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const logger = require("morgan");
const cors = require("cors");

const productRouter = require("./routes/api/products");
const userRouter = require("./routes/api/user");
const ordersRouter = require("./routes/api/orders");
const categoryRouter = require("./routes/api/category");
// const ratingRouter = require("./routes/api/rating");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/products", productRouter);
app.use("/api/user", userRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/categories", categoryRouter);
// app.use("/api/ratings", ratingRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
