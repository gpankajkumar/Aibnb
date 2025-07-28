const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userControllar = require("../controllers/users.js");

router.route("/signup")
  .get(userControllar.renderSinupForm)
  .post(wrapAsync(userControllar.signup));


router.route("/login")
  .get(userControllar.renderLoginForm)
  .post(saveRedirectUrl, passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }), userControllar.login);


router.get("/logout", userControllar.logout);

module.exports = router;