const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleSchemaErrors } = require("../middlewares");

const ratingSchema = new Schema(
  {
    productId: { type: String, unique: true },
    rating: { type: Number },
    ratedBy: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        name: String,
        email: String,
      },
    ],
    timestamp: { type: Date, default: Date.now },
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
