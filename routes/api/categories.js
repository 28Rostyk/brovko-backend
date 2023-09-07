const express = require("express");
const categoriesRouter = express.Router();

const { getCategory, addCategory } = require("../../controller");
const {
  checkNewCategoryData,
} = require("../../middlewares/checkNewCategoryData");
const { addCategorySchema, validateBody } = require("../../schemas");

categoriesRouter.get("/", getCategory);
categoriesRouter.post(
  "/add-category",
  checkNewCategoryData,
  validateBody(addCategorySchema),
  addCategory
);

module.exports = categoriesRouter;
