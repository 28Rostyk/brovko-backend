const { ctrlWrapper } = require("../../helpers");
const { Location } = require("../../models");

const getLocationById = async (req, res) => {
  const { locationId } = req.params;

  try {
    const location = await Location.findById(locationId);

    if (!location) {
      return res.status(404).json({ error: "Location not found" });
    }

    res.status(200).json(location);
  } catch (error) {
    console.log(error.red);
    return res.status(500).json({ error: "Server error" });
  }

  return console.log("GET LOCATION BY ID");
};

module.exports = { getLocationById: ctrlWrapper(getLocationById) };
