const { HttpError, ctrlWrapper } = require("../../helpers");
// const { Order } = require("../../models");
const { User } = require("../../models");

const getAllOrdersAuth = async (req, res) => {
  const { email } = req.user;
  const { userOrders } = await User.findOne({ email });

  // const data = await Order.find({ "contacts.email": email });

  // const ordersWithMatchingEmail = data.filter((order) => {
  //   return order.data.contacts.some(
  //     (contact) => contact.email && contact.email.includes(email)
  //   );
  // });

  if (userOrders.length === 0) {
    throw HttpError(404, "You do not have any orders");
  }

  res.status(200).json(userOrders);
};

module.exports = {
  getAllOrdersAuth: ctrlWrapper(getAllOrdersAuth),
};
