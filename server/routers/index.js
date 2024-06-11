const express = require('express')
const router = express.Router()
const Controller = require("../controllers/controller");

const errorHandler = require("../middlewares/error-handler.js");
const authentication = require("../middlewares/authentication.js");

router.get("/", Controller.showAllAnimals)
router.get("/:id", Controller.showAnimalById);

router.post("/register", Controller.register);
router.post("/login", Controller.login);

router.use(authentication);
router.put("/user-profile", Controller.editUserProfile)
router.delete("/user-profile", Controller.deleteUserProfile)

// router.get("/:id/application-form", Controller.formAdoption);
// router.get("/:id/payment", Controller.payment);

router.use(errorHandler);

module.exports = router;