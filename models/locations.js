const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleSchemaErrors } = require("../helpers");

const locationSchema = new Schema(
  {
    name: { type: String, required: true },
    fullName: { type: String, required: true },
    latitude: { type: String, required: true },
    longitude: { type: String, required: true },
    address: { type: String, required: true },
    mapUrl: { type: String, required: true },
    phone: { type: Array, default: [], required: true },
    workingHours: { type: Object, required: true },
  },
  { versionKey: false, timestamps: true }
);

locationSchema.post("save", function (error, doc, next) {
  handleSchemaErrors(error, doc, next);
});

const addSchema = Joi.object({
  name: Joi.string().required,
  fullName: Joi.string().required,
  latitude: Joi.string().required,
  longitude: Joi.string().required,
  address: Joi.string().required,
  mapUrl: Joi.string().required,
  phone: Joi.array().items(String).required,
  workingHours: Joi.object().required,
});

const schemas = {
  addSchema,
};

const Location = model("location", locationSchema);

module.exports = {
  Location,
  schemas,
};
