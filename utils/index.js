const { validateBody } = require("./validateBody");
const { idGenerator } = require("./idGenerator");
const { phoneRegex, digitsRegex } = require("./regexPatterns");

module.exports = {
  validateBody,
  idGenerator,
  phoneRegex,
  digitsRegex,
};
