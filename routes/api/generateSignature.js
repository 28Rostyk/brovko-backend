const express = require("express");
const generateSignatureRouter = express.Router();

const { generateSignature } = require("../../controller");

generateSignatureRouter.post("/", generateSignature);

module.exports = { generateSignatureRouter };
