const express = require("express");
const databaseRouter = express.Router();
const { updateDatabase } = require("../../services");

// const { addProduct } = require("../../controller");

databaseRouter.post("/", updateDatabase);

module.exports = { databaseRouter };
