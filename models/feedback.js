const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleSchemaErrors } = require("../helpers");

const feedbackSchema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    phone: {
      type: String,
      default: "",
      required: true,
    },
    text: {
      type: String,
      required: true,
      minlength: [10, "Мінімальна кількість символів повинна бути не менше 10"],
      maxlength: [
        2500,
        "Максимальна кількість символів повинна бути не більше 2500",
      ],
    },
  },
  { versionKey: false, timestamps: true }
);

feedbackSchema.post("save", function (error, doc, next) {
  handleSchemaErrors(error, doc, next);
});

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  text: Joi.string().min(10).max(2500).required().messages({
    "string.min":
      "Мінімальна довжина тексту повинна бути не менше {#limit} символів",
    "string.max":
      "Максимальна довжина тексту повинна бути не більше {#limit} символів",
  }),
});

const schemas = {
  addSchema,
};

const Feedback = model("feedback", feedbackSchema);

module.exports = {
  schemas,
  Feedback,
};
