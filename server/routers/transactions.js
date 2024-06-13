const express = require("express");
const transactions = express.Router();
const Controller = require("../controllers/controller");

transactions.post("/:id/application-form", Controller.formAdoption);
transactions.post("/:id/generate-midtrans-token", Controller.generateMidtransToken)
transactions.patch("/:id/payment", Controller.payment);

module.exports = transactions;