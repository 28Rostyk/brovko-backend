const express = require("express");
const locationRouter = express.Router();

const {
  addLocations,
  getAllLocations,
  getLocationById,
  removeLocation,
  updateLocation,
} = require("../../controller");

const { authenticate } = require("../../middlewares");

locationRouter.get("/", getAllLocations);
locationRouter.get("/:locationId", getLocationById);
locationRouter.post("/add-location", addLocations);
locationRouter.post("/delete", authenticate, removeLocation);
locationRouter.patch("/update/:id", authenticate, updateLocation);

module.exports = { locationRouter };
