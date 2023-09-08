const { databaseRouter } = require("./databaseRouter");
const { categoriesRouter } = require("./categories");
const { ordersRouter } = require("./orders");
const { productsRouter } = require("./products");
const { ratingRouter } = require("./rating");
const { userRouter } = require("./user");

module.exports = {
  databaseRouter,
  categoriesRouter,
  ordersRouter,
  productsRouter,
  ratingRouter,
  userRouter,
};
