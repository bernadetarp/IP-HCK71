const express = require("express");
const animals = express.Router();
const Controller = require("../controllers/controller");

animals.get("/", Controller.showAllAnimals)
animals.get("/:id", Controller.showAnimalById);

module.exports = animals;