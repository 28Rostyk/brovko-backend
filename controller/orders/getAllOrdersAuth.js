const HttpError = require("../../helpers");
const Orders = require("../../models/orders");

const { ctrlWrapper } = require("../../utils");

const getAllOrdersAuth = async (req, res) => {
  const { email } = req.user;
  console.log(email);

  const data = await Orders.find({ "contacts.email": email });
  // console.log(data);

  const ordersWithMatchingEmail = data.filter((order) => {
    return order.data.contacts.some(
      (contact) => contact.email && contact.email.includes(email)
    );
  });

  if (ordersWithMatchingEmail.length === 0) {
    throw HttpError(404, "You do not have any orders");
  }

  res.status(200).json(ordersWithMatchingEmail);
};

module.exports = {
  getAllOrdersAuth: ctrlWrapper(getAllOrdersAuth),
};
