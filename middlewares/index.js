const handleSchemaErrors = require("./handleSchemaErrors");
const authenticate = require("./authenticate");
const passport = require("./google-authenticate");
const checkNewProductId = require("./checkNewProductId");

module.exports = {
  handleSchemaErrors,
  authenticate,
  passport,
  checkNewProductId,
};
