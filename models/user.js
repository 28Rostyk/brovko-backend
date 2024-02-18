const { Schema, model } = require("mongoose");

const { handleSchemaErrors } = require("../helpers");

// видалити зайве пізніше
const citySchema = new Schema({
  Present: { type: String, default: "" },
  // Warehouses: { type: Number, default: 0 },
  MainDescription: { type: String, default: "" },
  Area: { type: String, default: "" },
  Region: { type: String, default: "" },
  SettlementTypeCode: { type: String, default: "" },
  Ref: { type: String, default: "" },
  DeliveryCity: { type: String, default: "" },
  // AddressDeliveryAllowed: { type: Boolean, default: false },
  // StreetsAvailability: { type: Boolean, default: false },
  ParentRegionTypes: { type: String, default: "" },
  ParentRegionCode: { type: String, default: "" },
  RegionTypes: { type: String, default: "" },
  RegionTypesCode: { type: String, default: "" },
});

const streetSchema = new Schema({
  SettlementRef: { type: String, default: "" },
  SettlementStreetRef: { type: String, default: "" },
  SettlementStreetDescription: { type: String, default: "" },
  Present: { type: String, default: "" },
  StreetsType: { type: String, default: "" },
  StreetsTypeDescription: { type: String, default: "" },
  SettlementStreetDescriptionRu: { type: String, default: "" },
  // Location: { type: Object, default: {} },
});

const warehouseSchema = new Schema({
  SiteKey: { type: String, default: "" },
  Description: { type: String, default: "" },
  ShortAddress: { type: String, default: "" },
  Phone: { type: String, default: "" },
  TypeOfWarehouse: { type: String, default: "" },
  Number: { type: String, default: "" },
  Ref: { type: String, default: "" },
});

const novaPoshtaSchema = new Schema({
  city: { type: citySchema, default: {} },
  street: { type: streetSchema, default: {} },
  warehouse: { type: warehouseSchema, default: {} },
});

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
    status: {
      type: String,
      enum: ["customer", "manager", "superadmin"],
      default: "customer",
    },
    name: {
      type: String,
      default: "",
    },
    avatarURL: {
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
    city: {
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
      type: novaPoshtaSchema,
      default: {},
    },
    accessToken: {
      type: String,
      default: null,
    },
    refreshToken: {
      type: String,
      default: null,
    },
    resetToken: {
      type: String,
      default: null,
    },
    resetTokenExpiry: {
      type: Date,
      default: null,
    },
    userOrders: {
      type: Array,
      default: [],
    },
    favouriteProducts: {
      type: Array,
      default: [],
    },
    productInBasket: {
      type: Array,
      default: [],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSchemaErrors);

const User = model("user", userSchema);

module.exports = { User };
