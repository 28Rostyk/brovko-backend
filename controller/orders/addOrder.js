const { ctrlWrapper } = require("../../helpers");
const { createOrder } = require("../../services");

const addOrder = async (req, res) => {
  try {
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
