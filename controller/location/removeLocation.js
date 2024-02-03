const { Location } = require("../../models");
const { ctrlWrapper } = require("../../helpers");

const removeLocation = async (req, res) => {
  try {
    const { id } = req.params;

    // Видалення локації
    const deletedLocation = await Location.findByIdAndDelete(id);

    if (!deletedLocation) {
      return res.status(404).json({ error: "Локація не знайдена" });
    }

    res.status(200).json(deletedLocation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Помилка при видаленні локації" });
  }
};

module.exports = {
  removeLocation: ctrlWrapper(removeLocation),
};
