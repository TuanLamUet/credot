/** @format */

const router = require("express").Router();
const { credentialsVaidation } = require("../validation/authValidation");
const auth = require("../middleware/auth");
const authController = require("../controller/authController");
const userController = require("../controller/userController");
const bankController = require("../controller/bankController");
router.post("/login", credentialsVaidation, authController.login);
router.post("/register", credentialsVaidation, authController.register);

router.get("/suggest", bankController.getAllBank);

router.get("/user", auth, userController.userInfo);
module.exports = router;
