const { validateBody } = require("./validateBody");
const { addProductSchema } = require("./addProductSchema");
const { addCategorySchema } = require("./addCategorySchema");
const { addOrderSchema } = require("./addOrderSchema");

module.exports = {
  validateBody,
  addProductSchema,
  addCategorySchema,
  addOrderSchema,
};
