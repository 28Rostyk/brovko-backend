const { ctrlWrapper } = require("../../helpers");
const { createProduct } = require("../../services");

const addProduct = async (req, res) => {
  try {
    const response = await createProduct(req.body);

    res.status(200).json({
      status: response.data.status,
      message: response.message,
    });
  } catch (error) {
    console.log("Error in Controller: ", error.message);
    res.json({ message: error.message });
  }
};

module.exports = { addProduct: ctrlWrapper(addProduct) };
