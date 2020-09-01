/** @format */

const router = require("express").Router();
const { credentialsVaidation } = require("../validation/authValidation");
const auth = require("../middleware/auth");
const authController = require("../controller/authController");
const userController = require("../controller/userController");
const bankController = require("../controller/bankController");
const loanController = require("../controller/loanController");

router.post("/login", credentialsVaidation, authController.login);
router.post("/register", credentialsVaidation, authController.register);

router.post("/bank",auth, bankController.createNewBank);
router.put("/bank",auth, bankController.addNewLoanPackageToBank);
router.get("/suggest",auth, bankController.getAllBank);

router.get("/loan",auth, loanController.listRequestLoad)
router.post("/loan",auth, loanController.createNewRequestLoad)
router.get("/user", auth, userController.userInfo);
module.exports = router;
