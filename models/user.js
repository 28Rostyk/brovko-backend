const { Schema, model } = require("mongoose");

const { handleSchemaErrors } = require("../helpers");

// const novaposhtaSchema = new Schema({
//   area: String,
//   region: String,
//   city: String,
//   wareHouseNumber: String,
// });

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      default: "",
    },
    lastName: {
      type: String,
      default: "",
    },
    middleName: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    name: {
      type: String,
      default: "",
    },
    birthday: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    street: {
      type: String,
      default: "",
    },
    buildingNumber: {
      type: String,
      default: "",
    },
    flat: {
      type: String,
      default: "",
    },
    novaPoshta: {
      type: Schema.Types.Mixed,
      area: String,
      region: String,
      city: String,
      wareHouseNumber: String,
    },
    accessToken: {
      type: String,
      default: null,
    },
    refreshToken: {
      type: String,
      default: null,
    },
    favoriteOrders: {
      type: Array,
      default: [],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSchemaErrors);

const User = model("user", userSchema);

module.exports = { User };
