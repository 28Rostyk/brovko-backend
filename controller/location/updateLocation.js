const { Location } = require("../../models");
const { ctrlWrapper } = require("../../helpers");

const updateLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    // Оновлення локації
    const updatedLocation = await Location.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedLocation) {
      return res.status(404).json({ error: "Локація не знайдена" });
    }

    res.status(200).json(updatedLocation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Помилка при оновленні локації" });
  }
};

module.exports = {
  updateLocation: ctrlWrapper(updateLocation),
};
