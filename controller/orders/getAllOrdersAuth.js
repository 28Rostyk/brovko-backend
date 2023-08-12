const HttpError = require("../../helpers");
const Orders = require("../../models/orders");

const { ctrlWrapper } = require("../../utils");

const getAllOrdersAuth = async (req, res) => {
  const { email } = req.user;
  console.log(email);

  const data = await Orders.find({ owner: email });

  if (!data) {
    throw HttpError(404, "Your not have order");
  }

  res.status(200).json(data);
};

module.exports = {
  getAllOrdersAuth: ctrlWrapper(getAllOrdersAuth),
};
