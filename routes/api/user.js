const express = require("express");
const router = express.Router();

const { validateBody } = require("../../utils");

const userValidation = require("../../models/user");
const controllers = require("../../controller/user");
const { authenticate, passport } = require("../../midlewares");

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }, controllers.googleAuth)
);

router.post("/register", validateBody(userValidation), controllers.register);
router.post("/login", controllers.login);
router.get("/current", authenticate, controllers.current);
router.post("/logout", authenticate, controllers.logout);

module.exports = router;
