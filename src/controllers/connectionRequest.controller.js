const { ConnectionRequestResponseDto } = require("../dto");
const { ConnectionRequestModel } = require("../models");
const { ErrorMessage } = require("../constant");
const { UserModel } = require("../models");
const mongoose = require("mongoose");
class ConnectionRequestController {
  static async connectionRequest(req, res) {
    try {
      const toUserId = req.params.toUserId;
      const fromUserId = req.user._id;
      const status = req.params.status;
      // const isSelfRequest = toUserId == fromUserId;
      // if (isSelfRequest) {
      //   throw new Error("You cannot send a request to yourself");
      // }
      const isUserToExist = await UserModel.findById(toUserId);
      if (!isUserToExist) {
        throw new Error(ErrorMessage.UserNotFound);
      }

      const existingRequest = await ConnectionRequestModel.findOne({
        $or: [
          { fromUserId: fromUserId, toUserId: toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (existingRequest) {
        return res.status(409).json({
          success: false,
          message: ErrorMessage.CONNECTION_REQUEST_ALREADY_EXISTS,
        });
      }
      const connectionRequest = new ConnectionRequestModel({
        fromUserId: fromUserId,
        toUserId: toUserId,
        status: status,
      });
      const saveConnectionRequest = await connectionRequest.save();
      const responseData = new ConnectionRequestResponseDto(
        saveConnectionRequest
      );
      res.status(200).json({
        success: true,
        message:
          req.user.firstName +
          " " +
          status +
          " connection Request to " +
          isUserToExist.firstName,
        data: responseData,
      });
    } catch (error) {
      console.error(error.message);
      res
        .status(500)
        .json({ success: false, message: ErrorMessage.SomeThingWentWrong });
    }
  }
  static async reviewConnectionRequest(req, res) {
    try {
      const loggedInUser = req.user;
      const requestId = req.params.requestId;
      const status = req.params.status;
      const request = await ConnectionRequestModel.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });
      if (!request) {
        throw new Error(ErrorMessage.REQUEST_NOT_FOUND);
      }
      // update status
      request.status = status;
      const updatedRequest = await request.save();
      const responseData = new ConnectionRequestResponseDto(updatedRequest);
      res.status(200).json({
        success: true,
        message: "Connection Request " + status,
        data: responseData,
      });
    } catch (error) {
      console.error(error.message);
      res
        .status(500)
        .json({ success: false, message: ErrorMessage.SomeThingWentWrong });
    }
  }
  static async getConnection(req, res) {
    try {
      const loggedInUser = req.user._id;
      const toUserId = new mongoose.Types.ObjectId(req.params.toUserId);
      const connection = await ConnectionRequestModel.findOne({
        $or: [
          { fromUserId: loggedInUser, toUserId: toUserId },
          { fromUserId: toUserId, toUserId: loggedInUser },
        ],
        status: "accepted",
      });

      if (!connection) {
        throw new Error("Connection Not Found");
      }
      res
        .status(200)
        .json({
          success: true,
          message: "Connection Fetch SuccessFully",
          data: connection,
        });
    } catch (error) {
      console.error(error.message);
      res
        .status(500)
        .json({ success: false, message: ErrorMessage.SomeThingWentWrong });
    }
  }
}

module.exports = { ConnectionRequestController };
