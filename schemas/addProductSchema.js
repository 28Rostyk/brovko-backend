const Joi = require("joi");

const { FORM_KEY } = process.env;

const productSchema = Joi.object({
  id: Joi.string()
    .required()
    .messages({ "string.empty": "Вкажіть ID. Він є обов'язковим" }),

  name: Joi.string()
    .required()
    .messages({ "string.empty": "Вкажіть назву товару. Вона є обов'язковою" }),

  nameForDocuments: Joi.string().allow(""),

  costPerItem: Joi.string()
    .required()
    .messages({ "string.empty": `Вкажіть ціну товару. Вона є обов'язковою'` }),

  sku: Joi.string().allow(""),
  manufacturer: Joi.string().allow(""),
  currency: Joi.string().allow(""),

  discount: Joi.object({
    value: Joi.string().allow(""),
    date_start: Joi.string().allow(""),
    date_end: Joi.string().allow(""),
  }),

  weight: Joi.string().allow(""),
  volume: Joi.string().allow(""),
  length: Joi.string().allow(""),
  width: Joi.string().allow(""),
  height: Joi.string().allow(""),
  barcode: Joi.string().allow(""),
  stockBalance: Joi.string().allow(""),
  expenses: Joi.string().allow(""),
  currencyExpenses: Joi.string().allow(""),

  category: Joi.object({
    id: Joi.string().allow(""),
    name: Joi.string()
      .allow("")
      .default("Без категорії")
      .empty("Без категорії"),
    parentId: Joi.string().allow(""),
  }),

  description: Joi.string().allow(""),
  url: Joi.string().allow(""),
  note: Joi.string().allow(""),
  supplier: Joi.string().allow(""),
  keywords: Joi.string().allow(""),

  images: Joi.array(),
  params: Joi.array(),

  parentProductId: Joi.string().allow(""),

  additionalPrices: Joi.array(),
  label: Joi.array(),
});

const addProductSchema = Joi.object({
  form: Joi.string()
    .valid(FORM_KEY)
    .error(new Error("Товар не додано. Відсутній коректний form-ключ.")),

  action: Joi.string()
    .valid("update")
    .error(new Error("Товар не додано. Невалідний тип `action`")),

  dontUpdateFields: Joi.array(),
  product: Joi.array().items(productSchema),
});

module.exports = { addProductSchema };
