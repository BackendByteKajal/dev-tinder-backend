const express = require("express");
const { UserController } = require("../controllers");
const { AuthMiddleware } = require("../middleware");
const { pagination } = require("../validator");
const userRouter = express.Router();

//Get Pending Connection Request
userRouter.get(
  "/requests/received",
  AuthMiddleware.authMiddleware,
  UserController.getReceivedUserConnectionRequest
);

userRouter.get(
  "/connections",
  AuthMiddleware.authMiddleware,
  UserController.getUserConnections
);

userRouter.get("/feed", AuthMiddleware.authMiddleware, UserController.getFeed);
userRouter.get(
  "/isPremium",
  AuthMiddleware.authMiddleware,
  UserController.verifyPremiumUser
);
module.exports = { userRouter };
