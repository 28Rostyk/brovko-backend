require("dotenv").config();
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const logger = require("morgan");
const cors = require("cors");

const {
  databaseRouter,
  categoriesRouter,
  ordersRouter,
  productsRouter,
  ratingRouter,
  userRouter,
  reviewsRouter,
  generateSignatureRouter,
} = require("./routes");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/products", productsRouter);
app.use("/api/user", userRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/ratings", ratingRouter);
app.use("/api/reviews", reviewsRouter);
app.use("/api/update-database", databaseRouter);
app.use("/api/generate-signature", generateSignatureRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
