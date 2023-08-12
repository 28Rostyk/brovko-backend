const Order = require("../../models/orders");
const HttpError = require("../../helpers");

const { ctrlWrapper } = require("../../utils");

const addOrder = async (req, res) => {
  const {
    owner,
    customerName,
    customerLocation,
    products,
    customerPhone,
    priceAll,
  } = req.body;

  const data = await Order.create({
    customerName,
    customerLocation,
    products,
    customerPhone,
    priceAll,
    owner,
  });
  if (!data) {
    throw HttpError(400);
  }
  res.status(201).json(owner);
};

module.exports = {
  addOrder: ctrlWrapper(addOrder),
};
