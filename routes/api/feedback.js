const express = require("express");
const feedbackRouter = express.Router();

const { addFeedback, getFeedback } = require("../../controller");

// const { authenticate } = require("../../middlewares");

feedbackRouter.post("/add-feedback", addFeedback);
feedbackRouter.get("/", getFeedback);

module.exports = { feedbackRouter };
