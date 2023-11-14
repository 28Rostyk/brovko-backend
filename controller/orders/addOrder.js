const { ctrlWrapper } = require("../../helpers");
const { createOrder } = require("../../services");
const { User } = require("../../models");

const addOrder = async (req, res) => {
  try {
    const { email, products } = req.body;
    const user = await User.findOne({ email });
    await User.findByIdAndUpdate(user._id, {
      userOrders: [...user.userOrders, ...products],
    });
    const response = await createOrder(req.body);

    res.status(201).json({
      data: response.data,
      message: response.message,
    });
  } catch (error) {
    console.log("Error in Controller: ", error.message);
    res.json({ message: error.message });
  }
};

module.exports = { addOrder: ctrlWrapper(addOrder) };
