const express = require('express')
const router = express.Router()
const transactions = require("./transactions.js");
const users = require("./users.js")
const animals = require("./animals.js")
const Controller = require("../controllers/controller");

const errorHandler = require("../middlewares/error-handler.js");
const authentication = require('../middlewares/authentication.js');

router.use("/animals", animals)

router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.post("/login-google", Controller.loginByGoogle)
router.post("/forgot-password", Controller.forgotPassword);
router.get("/reset-password/:UserId/:token", Controller.getResetPassword);
router.post("/reset-password/:UserId/:token", Controller.postResetPassword);

router.use(authentication)
router.use("/user", users);
router.use("/transaction", transactions);

router.use(errorHandler);

module.exports = router;