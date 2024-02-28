const { Location } = require("../../models");
const { ctrlWrapper } = require("../../helpers");

const removeLocation = async (req, res) => {
  try {
    // const { id } = req.params;
    const { ids } = req.body;
    console.log("ids :>> ".bgMagenta, req.body);

    // Видалення локації
    // const deletedLocation = await Location.findByIdAndDelete(id);
    const deletedLocations = await Location.deleteMany({ _id: { $in: ids } });

    // if (!deletedLocation) {
    //   return res.status(404).json({ error: "Локація не знайдена" });
    // }

    if (deletedLocations.deletedCount === 0) {
      return res.status(404).json({ error: "Локації не знайдені" });
    }

    res.status(200).json({
      message: "Локації успішно видалені",
      locations: deletedLocations,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Помилка при видаленні локації" });
  }
};

module.exports = {
  removeLocation: ctrlWrapper(removeLocation),
};
