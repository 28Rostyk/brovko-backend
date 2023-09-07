const { idGenerator } = require("../utils");

async function checkNewCategoryData(req, res, next) {
  const receivedId = req.body.category[0].id;

  !receivedId && (req.body.category[0].id = idGenerator(5, "C"));

  next();
}

module.exports = { checkNewCategoryData };
