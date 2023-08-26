const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleSchemaErrors } = require("../midlewares");

const ratingSchema = new Schema(
  {
    productId: { type: String },
    rating: { type: Number, default: 0 },
  },
  { versionKey: false, timestamps: true }
);

ratingSchema.post("save", function (error, doc, next) {
  handleSchemaErrors(error, doc, next);
});

// const addSchema = Joi.object({
//   productId: Joi.string().required,
//   rating: Joi.number().required,
// });

// const schemas = {
//   addSchema,
// };

const Rating = model("rating", ratingSchema);

module.exports = {
  Rating,
  //   schemas,
};
