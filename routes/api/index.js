const { databaseRouter } = require("./databaseRouter");
const { categoriesRouter } = require("./categories");
const { ordersRouter } = require("./orders");
const { productsRouter } = require("./products");
const { ratingRouter } = require("./rating");
const { userRouter } = require("./user");
const { reviewsRouter } = require("./reviews");
const { generateSignatureRouter } = require("./generateSignature");
const { locationRouter } = require("./locations");

module.exports = {
  databaseRouter,
  categoriesRouter,
  ordersRouter,
  productsRouter,
  ratingRouter,
  userRouter,
  reviewsRouter,
  generateSignatureRouter,
  locationRouter,
};
