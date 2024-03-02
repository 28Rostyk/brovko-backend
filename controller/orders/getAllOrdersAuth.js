const { ctrlWrapper } = require("../../helpers");
const { Order } = require("../../models");

const getAllOrdersAuth = async (req, res) => {
  const { email } = req.user;

  const data = await Order.find({ "contacts.email": email });

  const ordersWithMatchingEmail = data.filter((order) => {
    return order.data.contacts.some(
      (contact) => contact.email && contact.email.includes(email)
    );
  });
  // console.log("ordersWithMatchingEmail", ordersWithMatchingEmail);

  if (ordersWithMatchingEmail.length === 0) {
    res.status(200).json([]);
  }

  res.status(200).json(ordersWithMatchingEmail);
};

module.exports = {
  getAllOrdersAuth: ctrlWrapper(getAllOrdersAuth),
};
