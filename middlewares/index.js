const { authenticate } = require("./authenticate");
const { passport } = require("./google-authenticate");
const { checkNewProductData } = require("./checkNewProductData");
const { upload } = require("./upload");

module.exports = {
  authenticate,
  passport,
  checkNewProductData,
  upload,
};
