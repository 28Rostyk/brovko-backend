const express = require("express");
const categoriesRouter = express.Router();

const {
  getCategories,
  getCategoryById,
  addCategory,
} = require("../../controller");
const {
  checkNewCategoryData,
} = require("../../middlewares/checkNewCategoryData");
const { addCategorySchema, validateBody } = require("../../schemas");

categoriesRouter.get("/", getCategories);
categoriesRouter.get("/:categoryId", getCategoryById);
categoriesRouter.post(
  "/add-category",
  checkNewCategoryData,
  validateBody(addCategorySchema),
  addCategory
);

module.exports = { categoriesRouter };
