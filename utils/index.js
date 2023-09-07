const ctrlWrapper = require("./ctrlWrapper");
const updateDatabaseWithYmlFile = require("./updateDatabaseWithYmlFile");
const validateBody = require("./validateBody");
const addCategoryWithYmlFile = require("./addCategoryWithYmlFile");
const createProduct = require("./createProduct");
const createCategory = require("./createCategory");
const idGenerator = require("./idGenerator");

module.exports = {
  ctrlWrapper,
  updateDatabaseWithYmlFile,
  validateBody,
  addCategoryWithYmlFile,
  createProduct,
  createCategory,
  idGenerator,
};
