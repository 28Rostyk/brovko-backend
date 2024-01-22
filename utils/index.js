const { validateBody } = require("./validateBody");
const { idGenerator } = require("./idGenerator");
const { phoneRegex, digitsRegex } = require("./regexPatterns");
const { updateDBCollection } = require("./updateCollection");

module.exports = {
  validateBody,
  idGenerator,
  phoneRegex,
  digitsRegex,
  updateDBCollection,
};
