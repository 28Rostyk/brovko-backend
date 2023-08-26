const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleSchemaErrors } = require("../midlewares");

const categorySchema = new Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    parentId: String,
  },
  { versionKey: false, timestamps: true }
);

categorySchema.post("save", function (error, doc, next) {
  handleSchemaErrors(error, doc, next);
});

const addSchema = Joi.object({
  id: Joi.string().required,
  name: Joi.string().required,
  parentId: Joi.string(),
});

const schemas = {
  addSchema,
};

const Category = model("category", categorySchema);

module.exports = {
  Category,
  schemas,
};
