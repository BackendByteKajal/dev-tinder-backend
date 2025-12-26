const { ErrorMessage } = require("../constant");
const ChatService = require("../services/chat.service");

class ChatController {
  static async getChatByUserId(req, res) {
    try {
      const senderUserId = req.user._id;
      const targetUserId = req.params.targetUserId;
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;

      let chat = await ChatService.getChatByUserId(senderUserId, targetUserId);

      return res.status(200).json({
        success: true,
        message: "Chat Fetch Successfully",
        data: chat,
      });
    } catch (error) {
      console.error("error: ", error);
      return res
        .status(500)
        .json({ success: false, message: ErrorMessage.SomeThingWentWrong });
    }
  }
}

module.exports = ChatController;
