const express = require('express')
const router = express.Router()
const Controller = require("../controllers/controller");

router.get("/", Controller.showAllAnimals)
router.get("/:id", Controller.showAnimalById);

router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.get("/:userId/user-profile", Controller.userProfile)

router.get("/:id/application-form", Controller.formAdoption);
router.get("/:id/payment", Controller.payment);

module.exports = router;