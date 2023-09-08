const { Schema, model } = require("mongoose");

const { handleSchemaErrors } = require("../helpers");

const userSchema = new Schema(
  {
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
