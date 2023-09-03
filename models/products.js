const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleSchemaErrors } = require("../middlewares");

const productSchema = new Schema(
  {
    id: {
      type: String,
    },
    available: {
      type: Boolean,
    },
    inStock: {
      type: Boolean,
    },

    price: {
      type: Number,
    },
    currencyId: {
      type: String,
    },
    categoryId: {
      type: String,
    },
    description: {
      type: String,
    },
    name: {
      type: String,
    },
    url: {
      type: String,
    },
    picture: {
      type: String,
    },
    vendor: {
      type: String,
    },
    vendorCode: {
      type: String,
    },
    barcode: {
      type: String,
    },
    keywords: {
      type: String,
    },
    // owner: {
    //   type: Schema.Types.ObjectId,
    //   ref: "user",
    //   //   required: true,
    // },
  },
  { versionKey: false, timestamps: true }
);

productSchema.post("save", function (error, doc, next) {
  handleSchemaErrors(error, doc, next);
});

const addSchema = Joi.object({
  id: Joi.string(),
  name: Joi.string(),
  available: Joi.boolean(),
  inStock: Joi.boolean(),
  price: Joi.number(),
  currencyId: Joi.string(),
  categoryId: Joi.string(),
  description: Joi.string(),
  vendor: Joi.string(),
  vendorCode: Joi.string(),
  barcode: Joi.string(),
  url: Joi.string(),
  picture: Joi.string(),
  keywords: Joi.string(),
});

const schemas = {
  addSchema,
};

const Products = model("products", productSchema);

module.exports = {
  Products,
  schemas,
};
