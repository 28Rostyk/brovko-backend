const { customAlphabet } = require("nanoid");
const nanoid = customAlphabet("1234567890", 5);

async function checkNewProductId(req, res, next) {
  const receivedId = req.body.product[0].id;
  if (receivedId) {
    next();
  }
  const adjustmentId = nanoid();
  req.body.product[0].id = adjustmentId;

  next();
}

module.exports = checkNewProductId;
