const { Schema, model } = require("mongoose");
// const Joi = require("joi");

const { handleSchemaErrors } = require("../helpers");

const reviewsSchema = new Schema(
  {
    comments: [
      {
        text: {
          type: [
            {
              text: {
                type: String,
                required: [true, "Text is required"],
              },
              reviewURL: {
                type: String,
                default: "",
              },
              createdAt: {
                type: Date,
                default: Date.now,
              },
            },
          ],
          required: [true, "Text is required"],
        },
        owner: {
          userId: { type: Schema.Types.ObjectId, ref: "User" },
          name: String,
          email: String,
        },
      },
    ],
    productId: {
      type: String,
      ref: "Product",
      required: [true, "ProductId is required"],
    },
  },
  { timestamps: true },
  { versionKey: false, timestamps: true }
);

reviewsSchema.post("save", function (error, doc, next) {
  handleSchemaErrors(error, doc, next);
});

// const addSchema = Joi.object({
//   productId: Joi.string().required,
//   text: Joi.number().required,
// });

// const schemas = {
//   addSchema,
// };

const Reviews = model("reviews", reviewsSchema);

module.exports = {
  Reviews,
  // schemas,
};
