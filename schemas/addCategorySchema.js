const Joi = require("joi");

const { FORM_KEY } = process.env;

const CategorySchema = Joi.object({
  id: Joi.string()
    .required()
    .messages({ "string.empty": "Вкажіть ID. Він є обов'язковим" }),

  name: Joi.string().required().messages({
    "string.empty": "Вкажіть назву категорії. Вона є обов'язковою",
  }),

  parentId: Joi.string().allow(""),
});

const addCategorySchema = Joi.object({
  form: Joi.string()
    .valid(FORM_KEY)
    .error(new Error("Категорію не додано. Відсутній коректний form-ключ.")),

  action: Joi.string()
    .valid("update")
    .error(new Error("Категорію не додано. Невалідний тип `action`")),

  category: Joi.array().items(CategorySchema),
});

module.exports = { addCategorySchema };
