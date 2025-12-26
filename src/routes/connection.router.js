const express = require("express");
const { ConnectionRequestController } = require("../controllers");
const { AuthMiddleware } = require("../middleware");
const connectionRouter = express.Router();

connectionRouter.get(
  "/:toUserId",
  AuthMiddleware.authMiddleware,
  ConnectionRequestController.getConnection
);
module.exports = connectionRouter;
