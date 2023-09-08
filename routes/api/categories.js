const express = require("express");
const categoriesRouter = express.Router();

const { getCategories, addCategory } = require("../../controller");
const {
  checkNewCategoryData,
} = require("../../middlewares/checkNewCategoryData");
const { addCategorySchema, validateBody } = require("../../schemas");

categoriesRouter.get("/", getCategories);
categoriesRouter.post(
  "/add-category",
  checkNewCategoryData,
  validateBody(addCategorySchema),
  addCategory
);

module.exports = { categoriesRouter };
