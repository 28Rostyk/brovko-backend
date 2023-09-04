const handleSchemaErrors = require("./handleSchemaErrors");
const authenticate = require("./authenticate");
const passport = require("./google-authenticate");
const checkNewProductData = require("./checkNewProductData");

module.exports = {
  handleSchemaErrors,
  authenticate,
  passport,
  checkNewProductData,
};
