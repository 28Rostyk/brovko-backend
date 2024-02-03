const express = require("express");
const locationRouter = express.Router();

const {
  addLocations,
  getAllLocations,
  removeLocation,
  updateLocation,
} = require("../../controller");

const { authenticate } = require("../../middlewares");

locationRouter.post("/add-location", addLocations);
locationRouter.get("/", getAllLocations);
locationRouter.delete("/:id", authenticate, removeLocation);
locationRouter.patch("/update/:id", authenticate, updateLocation);

module.exports = { locationRouter };
