const { Location } = require("../../models");
const { ctrlWrapper } = require("../../helpers");

const addLocations = async (req, res) => {
  try {
    const data = req.body;

    if (Array.isArray(data)) {
      // Перевірка унікальності кожного об'єкта перед додаванням
      const uniqueLocations = await Promise.all(
        data.map(async (location) => {
          const existingLocation = await Location.findOne({
            name: location.name,
            latitude: location.latitude,
            longitude: location.longitude,
          });
          return existingLocation ? null : location;
        })
      );

      const filteredLocations = uniqueLocations.filter(
        (location) => location !== null
      );

      if (filteredLocations.length > 0) {
        const savedLocations = await Location.create(filteredLocations);
        res.status(201).json(savedLocations);
      } else {
        res.status(400).json({ error: "Усі локації вже існують" });
      }
    } else {
      // Якщо вхідні дані не є масивом, додати одну локацію
      const {
        name,
        fullName,
        latitude,
        longitude,
        address,
        mapUrl,
        phone,
        workingHours,
      } = data;

      const existingLocation = await Location.findOne({
        name,
        latitude,
        longitude,
      });

      if (!existingLocation) {
        const newLocation = new Location({
          name,
          fullName,
          latitude,
          longitude,
          address,
          mapUrl,
          phone,
          workingHours,
        });

        const savedLocation = await newLocation.save();
        res.status(201).json(savedLocation);
      } else {
        res.status(400).json({ error: "Ця локація вже існує" });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Помилка при додаванні локацій" });
  }
};

module.exports = {
  addLocations: ctrlWrapper(addLocations),
};
