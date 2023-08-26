const express = require("express");
const categoryRouter = express.Router();

const { getCategory } = require("../../controller");

categoryRouter.get("/", getCategory);

module.exports = categoryRouter;
