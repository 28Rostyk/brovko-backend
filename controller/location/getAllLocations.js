const { Location } = require("../../models");
const { ctrlWrapper } = require("../../helpers");

const getAllLocations = async (req, res) => {
  try {
    const locations = await Location.find();
    res.status(200).json(locations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Помилка при отриманні локацій" });
  }
};

module.exports = {
  getAllLocations: ctrlWrapper(getAllLocations),
};
