const { ErrorMessage } = require("../constant");
const { ChatCreateDto } = require("../dto");
const { ChatModel, UserModel } = require("../models");

class ChatService {
  static async isChatExist(senderUserId, targetUserId) {
    try {
      const chat = await ChatModel.findOne({
        participants: {
          $all: [senderUserId, targetUserId],
        },
      });

      if (!chat) {
        return false;
      }
      return chat;
    } catch (error) {
      console.error(error);
      throw err.message;
    }
  }
  static async createChat(senderUserId, targetUserId, text) {
    try {
      const chat = new ChatModel({
        participants: [senderUserId, targetUserId],
        messages: [],
      });
      const saveChat = await chat.save();
    } catch (error) {
      console.error(error);
      throw error.message;
    }
  }

  static async getChatByUserId(senderUserId, targetUserId) {
    try {
      const userData = await UserModel.findById(targetUserId);
      if (!userData) {
        throw new Error(ErrorMessage.TARGET_USER_NOT_FOUND);
      }
      let chat = await ChatModel.findOne({
        participants: {
          $all: [senderUserId, targetUserId],
        },
      }).populate({
        path: "messages.senderUserId",
        select: "firstName lastName photo",
      });

      if (!chat) {
        chat = await this.createChat(senderUserId, targetUserId);
      }
      return chat;
    } catch (error) {
      console.error(error);
      throw err.message;
    }
  }
}

module.exports = ChatService;
