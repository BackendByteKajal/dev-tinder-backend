const express = require("express");
const requestRouter = express.Router();
const { AuthMiddleware } = require("../middleware");
const { ConnectionRequestValidator } = require("../validator");
const { ConnectionRequestController } = require("../controllers");

requestRouter.post(
  "/send/:toUserId/:status",
  AuthMiddleware.authMiddleware,
  ConnectionRequestValidator.ConnectionRequestSend,
  ConnectionRequestController.connectionRequest
);

requestRouter.patch(
  "/review/:requestId/:status",
  AuthMiddleware.authMiddleware,
  ConnectionRequestValidator.ConnectionReviewRequestSend,
  ConnectionRequestController.reviewConnectionRequest
);

module.exports = { requestRouter };
