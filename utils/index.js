const { validateBody } = require("./validateBody");
const { idGenerator } = require("./idGenerator");
const { phoneRegex, digitsRegex } = require("./regexPatterns");
const { addDataToDBCollection } = require("./updateDBCollection");

module.exports = {
  validateBody,
  idGenerator,
  phoneRegex,
  digitsRegex,
  addDataToDBCollection,
};
