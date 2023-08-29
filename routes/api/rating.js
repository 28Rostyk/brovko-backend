const express = require("express");
const ratingRouter = express.Router();

const { addRating, getRatings } = require("../../controller");

const { authenticate } = require("../../midlewares");

ratingRouter.post("/", authenticate, addRating);
ratingRouter.get("/:productId", getRatings);

module.exports = ratingRouter;
