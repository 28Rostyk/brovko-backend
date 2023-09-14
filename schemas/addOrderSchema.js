const Joi = require("joi");
const { FORM_KEY } = process.env;
const { phoneRegex, digitsRegex } = require("../utils");

const productSchema = Joi.object({
  id: Joi.string()
    .required()
    .messages({ "string.empty": "Вкажіть ID. Він є обов'язковим" }),

  name: Joi.string()
    .required()
    .messages({ "string.empty": "Вкажіть назву товару. Вона є обов'язковою" }),

  costPerItem: Joi.string()
    .required()
    .messages({ "string.empty": "Вкажіть ціну. Вона є обов'язковою" }),

  amount: Joi.string().required(),
  description: Joi.string().allow(""),
  discount: Joi.string().allow(""),
  sku: Joi.string().allow(""),
  commission: Joi.string().allow(""),
});

const novaPoshtaSchema = Joi.object({
  ServiceType: Joi.string().valid("Warehouse", "Doors").required(),
  payer: Joi.string().valid("sender", "recipient").required(),
  area: Joi.string().allow(""), // можливо, дописати валідацію за кирилицею
  region: Joi.string().allow(""), // уточнити "використовується тільки якщо cityNameFormat=settlement"
  city: Joi.string().required().messages({
    "string.empty": "Вкажіть місто.",
  }),
  cityNameFormat: Joi.string()
    .valid("full", "short", "settlement ")
    .default("full"),
  WarehouseNumber: Joi.string().regex(digitsRegex),
  Street: Joi.string().required().messages({
    "string.empty": "Вкажіть вулицю.",
  }),
  BuildingNumber: Joi.string().regex(digitsRegex).required().messages({
    "string.empty": "Вкажіть номер будинку.",
  }),
  Flat: Joi.string().regex(digitsRegex).allow(""),
});

const ukrposhtaSchema = Joi.object({
  ServiceType: Joi.string().valid("Warehouse", "Doors").allow(""),
  payer: Joi.string().valid("sender", "recipient").allow(""),
  type: Joi.string().valid("express", "standart").allow(""),
  city: Joi.string().allow(""),
  WarehouseNumber: Joi.string().allow(""),
  Street: Joi.string().allow(""),
  BuildingNumber: Joi.string().allow(""),
  Flat: Joi.string().allow(""),
});

const addOrderSchema = Joi.object({
  form: Joi.string()
    .valid(FORM_KEY)
    .error(
      new Error("Замовлення не надіслано. Відсутній коректний form-ключ.")
    ),
  getResultData: Joi.string().allow(""),
  commission: Joi.string().allow(""),
  shipping_costs: Joi.string().allow(""),
  organizationId: Joi.string().allow(""),

  products: Joi.array().items(productSchema),

  comment: Joi.string().allow(""),
  payment_method: Joi.string().required(),
  shipping_method: Joi.string().required(),
  shipping_address: Joi.string().required(),
  sajt: Joi.string().allow(""),

  lName: Joi.string().required(),
  fName: Joi.string().required(),
  mName: Joi.string().required(),

  phone: Joi.string().regex(phoneRegex).required().messages({
    "string.empty":
      "Вкажіть номер телефону. Без нього оформити замовлення неможливо",
    "string.pattern.base": "Вкажіть номер телефону у форматі +380XXXXXXXXX.",
    "any.required":
      "Вкажіть номер телефону. Без нього оформити замовлення неможливо",
  }),
  email: Joi.string().email().required().messages({
    "string.empty":
      "Вкажіть адресу електронної пошти. Без неї оформити замовлення неможливо",
    "string.email": "Вкажіть валідну адресу електронної пошти",
    "any.required":
      "Вкажіть адресу електронної пошти. Без неї оформити замовлення неможливо",
  }),
  con_comment: Joi.string().allow(""),

  novaposhta: novaPoshtaSchema,
  ukrposhta: ukrposhtaSchema,
  justin: Joi.object({
    WarehouseNumber: Joi.string().allow(""),
  }),

  stockId: Joi.string().allow(""),
  prodex24source_full: Joi.string().allow(""),
  prodex24source: Joi.string().allow(""),
  prodex24medium: Joi.string().allow(""),
  prodex24campaign: Joi.string().allow(""),
  prodex24content: Joi.string().allow(""),
  prodex24term: Joi.string().allow(""),
  prodex24page: Joi.string().allow(""),
});

module.exports = { addOrderSchema };
