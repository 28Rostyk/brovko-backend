const { idGenerator } = require("../utils");

async function checkNewProductData(req, res, next) {
  const receivedId = req.body.product[0].id;

  !receivedId && (req.body.product[0].id = idGenerator(5, "P"));

  next();
}

module.exports = { checkNewProductData };
