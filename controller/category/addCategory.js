const { createCategory } = require("../../services");
const { ctrlWrapper } = require("../../helpers");

const addCategory = async (req, res) => {
  try {
    const response = await createCategory(req.body);

    res.status(200).json({
      status: response.data.status,
      message: response.message,
    });
  } catch (error) {
    console.log("Error in Controller: ", error.message);
    res.json({ message: error.message });
  }
};

module.exports = { addCategory: ctrlWrapper(addCategory) };
