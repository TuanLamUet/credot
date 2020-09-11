/** @format */

const router = require("express").Router();

const auth = require("../middleware/auth");
const authController = require("../controller/authController");
const userController = require("../controller/userController");
const bankController = require("../controller/bankController");
const loanController = require("../controller/loanController");

router.post("/login", authController.login);
router.post("/user", authController.createNewUser)
router.patch("/register", authController.register);

router.post("/bank", auth, bankController.createNewBank);
router.put("/bank", auth, bankController.addNewLoanPackageToBank);
router.get("/bank", auth, bankController.getAllBank);

router.get("/loan", auth, loanController.listRequestLoan)
router.post("/loan", auth, loanController.createNewRequestLoan)
router.get("/user", auth, userController.userInfo);
module.exports = router;