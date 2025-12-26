const {
  ErrorMessage,
  Message,
  POPULATE_FIELDS,
  SAFE_FIELDS,
} = require("../constant");
const { ConnectionRequestModel, UserModel } = require("../models");
const { ConnectionRequestResponseDto, UserResponseDto } = require("../dto");
class UserController {
  static async getReceivedUserConnectionRequest(req, res) {
    try {
      const loggedInUser = req.user;
      const pendingRequests = await ConnectionRequestModel.find({
        toUserId: loggedInUser._id,
        status: "interested",
      }).populate("fromUserId", [
        "firstName",
        "lastName",
        "photo",
        "age",
        "gender",
        "about",
        "skills",
      ]);
      // if (pendingRequests.length === 0) {
      //   return res.status(404).json({
      //     success: false,
      //     message: ErrorMessage.PENDING_REQUEST_NOT_FOUND,
      //   });
      // }

      const responseData = pendingRequests.map((request) => {
        const fromUser = request.fromUserId;
        const responseFromUser = new UserResponseDto(fromUser);
        const response = new ConnectionRequestResponseDto(request);
        return { ...response, fromUserId: responseFromUser };
      });

      return res.status(200).json({
        success: true,
        message: Message.CONNECTION_REQUESTS_FOUND_SUCCESSFULLY,
        data: responseData,
      });
    } catch (error) {
      console.error(error.message);
      res
        .status(500)
        .json({ success: false, message: ErrorMessage.SomeThingWentWrong });
    }
  }

  static async getUserConnections(req, res) {
    try {
      const loggedInUser = req.user;
      // const userConnections = await ConnectionRequestModel.find({
      //   $and: [
      //     {
      //       $or: [
      //         { fromUserId: loggedInUser._id },
      //         { toUserId: loggedInUser._id },
      //       ],
      //     },
      //     { status: "accepted" },
      //   ],
      // })
      const userConnections = await ConnectionRequestModel.find({
        $or: [
          { fromUserId: loggedInUser._id, status: "accepted" },
          { toUserId: loggedInUser._id, status: "accepted" },
        ],
      })
        .populate("toUserId")
        .populate("fromUserId", POPULATE_FIELDS.USER_POPULATE_FIELDS);
      // if (userConnections.length === 0) {
      //   res
      //     .status(404)
      //     .json({ success: true, message: "User Connections Not Found" });
      // }
      const responseData = userConnections.map((connectionRequest) => {
        const toUserData = connectionRequest.toUserId;
        const fromUserData = connectionRequest.fromUserId;
        const connection = loggedInUser._id.equals(fromUserData._id)
          ? toUserData
          : fromUserData;

        const responseConnectionUser = new UserResponseDto(connection);
        return responseConnectionUser;
      });
      return res.status(200).json({
        success: true,
        message: "User Connections Fetch SuccessFully",
        data: responseData,
      });
    } catch (error) {
      console.error(error.message);
      res
        .status(500)
        .json({ success: false, message: ErrorMessage.SomeThingWentWrong });
    }
  }

  static async getFeed(req, res) {
    try {
      const loggedInUser = req.user;

      let { page, limit } = req.query;
      page = parseInt(page) || 1;
      limit = parseInt(limit) || 10;
      limit = limit > 50 ? 50 : limit;
      const skipValue = (page - 1) * limit;

      const connectionRequests = await ConnectionRequestModel.find({
        $or: [{ toUserId: loggedInUser._id }, { fromUserId: loggedInUser._id }],
      }).select("toUserId fromUserId");

      const connectionUserIdSet = new Set([loggedInUser._id]);
      connectionRequests.forEach((connectionRequest) => {
        connectionUserIdSet.add(connectionRequest.fromUserId);
        connectionUserIdSet.add(connectionRequest.toUserId);
      });

      //Convert Set->Array
      const connectionUserIds = Array.from(connectionUserIdSet);

      // const connectionUserIds = connectionRequests.map((request) => {
      //   const connectionUserId =
      //     loggedInUser._id.toString() === request.fromUserId.toString()
      //       ? request.toUserId
      //       : request.fromUserId;
      //   return connectionUserId;
      // });

      // const connectionUserIds = connectionRequests
      //   .flatMap((request) => [request.toUserId, request.fromUserId])
      //   .filter((id) => {
      //     return loggedInUser._id.toString() !== id.toString();
      //   });

      // //add loggedIn userId so exclude in query
      // connectionUserIds.push(loggedInUser._id);

      const feedUserData = await UserModel.find({
        _id: { $nin: connectionUserIds },
      })
        .select(SAFE_FIELDS.USER_SAFE_FIELDS)
        .skip(skipValue)
        .limit(limit);

      //response
      res.status(200).json({
        success: true,
        message: "Feed Fetch Successfully",
        data: feedUserData.map((ele) => {
          return new UserResponseDto(ele);
        }),
      });
    } catch (error) {
      console.error(error.message);
      res
        .status(500)
        .json({ success: true, message: ErrorMessage.SomeThingWentWrong });
    }
  }
  static async verifyPremiumUser(req, res) {
    try {
      const userId = req.user._id;
      const user = await UserModel.findById(userId);
      res.status(200).json({
        success: true,
        message: "fetch isPremiumUser Successfully",
        data: user.isPremium ?? false,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: ErrorMessage.SomeThingWentWrong });
    }
  }
}

module.exports = { UserController };
