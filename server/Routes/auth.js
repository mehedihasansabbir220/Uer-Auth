const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login/failed" }),
  (req, res) => {
    // Successful Google login, redirect to the home page or send a success response
    res.redirect(process.env.CLIENT_URL);
  }
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
});

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "Successfully Logged In",
      user: req.user.email,
    });
  } else {
    res.status(403).json({ success: false, message: "Not Authorized" });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "Log in failure",
  });
});

module.exports = router;
