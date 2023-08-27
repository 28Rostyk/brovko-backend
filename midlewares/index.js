const handleSchemaErrors = require("./handleSchemaErrors");
const authenticate = require("./authenticate");
const passport = require("./google-authenticate");

module.exports = {
  handleSchemaErrors,
  authenticate,
  passport,
};
