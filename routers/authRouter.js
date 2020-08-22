/** @format */

const router = require("express").Router();
const { credentialsVaidation } = require("../validation/authValidation");
const authController = require("../controller/authController");
router.post("/login", credentialsVaidation, authController.login);
router.post("/register", credentialsVaidation, authController.register);

module.exports = router;
