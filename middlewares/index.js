const { authenticate } = require("./authenticate");
const { passport } = require("./google-authenticate");
const { checkNewProductData } = require("./checkNewProductData");

module.exports = {
  authenticate,
  passport,
  checkNewProductData,
};
