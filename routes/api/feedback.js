const express = require("express");
const feedbackRouter = express.Router();

const { addFeedback, getFeedback } = require("../../controller");

// const { authenticate } = require("../../middlewares");

feedbackRouter.get("/:sort", getFeedback);
feedbackRouter.post("/add-feedback", addFeedback);

module.exports = { feedbackRouter };
