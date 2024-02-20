const express = require("express");
const feedbackRouter = express.Router();

const {
  addFeedback,
  getFeedback,
  updateFeedbackStatus,
} = require("../../controller");

// const { authenticate } = require("../../middlewares");

feedbackRouter.get("/:sort", getFeedback);
feedbackRouter.post("/add-feedback", addFeedback);
feedbackRouter.patch("/update-feedback/:feedbackId", updateFeedbackStatus);

module.exports = { feedbackRouter };
