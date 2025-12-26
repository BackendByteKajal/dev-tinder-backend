const express = require("express");
const { AuthMiddleware } = require("../middleware");
const { PaymentController } = require("../controllers");

const paymentRouter = express.Router();

paymentRouter.post(
  "/create-order",
  AuthMiddleware.authMiddleware,
  PaymentController.createOrder
);

module.exports = paymentRouter;
