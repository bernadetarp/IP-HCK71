const express = require("express");
const users = express.Router();
const Controller = require("../controllers/controller");

users.get("/user-profile", Controller.getUserProfile)
users.put("/user-profile", Controller.editUserProfile)
users.delete("/user-profile", Controller.deleteUserAccount)

module.exports = users;