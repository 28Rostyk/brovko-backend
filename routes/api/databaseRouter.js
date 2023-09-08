const express = require("express");
const databaseRouter = express.Router();
const { updateDatabase } = require("../../controller");

// const { addProduct } = require("../../controller");

databaseRouter.post("/", updateDatabase);

module.exports = { databaseRouter };
