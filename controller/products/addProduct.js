const { createProduct } = require("../../utils/createProduct");
const { ctrlWrapper } = require("../../utils");

const addProduct = async (req, res) => {
  console.log(req.body);

  try {
    const response = await createProduct(req.body);

    res.status(response.status).json({
      message: response.data.message,
    });
  } catch (error) {
    console.log("Error in Controller: ", error.message);
    res.json({ message: error.message });
  }
};

module.exports = { addProduct: ctrlWrapper(addProduct) };
