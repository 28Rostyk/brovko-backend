const { customAlphabet } = require("nanoid");
const nanoid = customAlphabet("1234567890", 5);

async function checkNewProductData(req, res, next) {
  const receivedId = req.body.product[0].id;
  const receiverPrice = req.body.product[0].costPerItem;

  !receivedId && (req.body.product[0].id = nanoid());
  !receiverPrice && (req.body.product[0].costPerItem = "00.00");

  next();
}

module.exports = checkNewProductData;
