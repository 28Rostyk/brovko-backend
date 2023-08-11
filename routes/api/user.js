const express = require("express");
const router = express.Router();

const { validateBody } = require("../../utils");

const userValidation = require("../../models/user");
const controllers = require("../../controller/user");
const { authenticate } = require("../../midlewares");

router.post("/register", validateBody(userValidation), controllers.register);
router.post("/login", controllers.login);
router.get("/current", authenticate, controllers.current);
router.post("/logout", authenticate, controllers.logout);

module.exports = router;
