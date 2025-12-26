const express = require("express");
const { AuthMiddleware } = require("../middleware/authmiddleware");
const { ChatController } = require("../controllers");
const chatRouter = express.Router();

chatRouter.get(
  "/:targetUserId",
  AuthMiddleware.authMiddleware,
  ChatController.getChatByUserId
);
module.exports = chatRouter;
