const express = require("express");
const feedbackRouter = express.Router();

const { addFeedback, getFeedback } = require("../../controller");

// const { authenticate } = require("../../middlewares");

feedbackRouter.get("/", getFeedback);
feedbackRouter.post("/add-feedbacks", addFeedback);

module.exports = { feedbackRouter };
