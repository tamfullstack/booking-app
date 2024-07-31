const { Router } = require("express");
const { body } = require("express-validator");

const User = require("../../models/User");
const authController = require("../../controllers/client/auth");
const isAuth = require("../../middleware/isAuth");

const router = Router();

router.get("/", isAuth, authController.getUser);

router.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("E-Mail address already exists!");
          }
        });
      })
      .normalizeEmail(),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Please enter a valid password."),
  ],
  authController.signup
);

router.post("/login", authController.login);

module.exports = router;
