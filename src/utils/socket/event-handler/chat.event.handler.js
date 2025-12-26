const { createSecretRoomId } = require("../../cypto");
const ChatService = require("../../../services/chat.service");
const { ConnectionRequestModel } = require("../../../models");
class SocketEventHandler {
  static joinChatEventHandler = async ({ socket, userId, toUserId }) => {
    console.log("joinChatEventHandler: ");
    try {
      //check these were friends
      const connection = await ConnectionRequestModel.findOne({
        $or: [
          { fromUserId: userId, toUserId: toUserId },
          { fromUserId: toUserId, toUserId: userId },
        ],
        status: "accepted",
      });

      if (!connection) {
        socket.emit("joinChatError", {
          message: "Something went wrong while joining chat",
        });
      }

      const roomId = [userId, toUserId].sort().join("_");
      //secure room id
      const hashRoomId = createSecretRoomId(roomId);
      //here user join room
      socket.join(hashRoomId);
    } catch (error) {
      console.error(error.message);
      socket.emit("joinChatError", {
        message: "Something went wrong while joining chat",
      });
    }
  };

  static SendMessageEventHandler = async ({
    io,
    socket,
    userId,
    toUserId,
    firstName,
    lastName,
    photo,
    time,
    text,
  }) => {
    try {
      const roomId = [userId, toUserId].sort().join("_");
      //secure room id
      const hashRoomId = createSecretRoomId(roomId);

      //save chat in db
      let chat = await ChatService.isChatExist(userId, toUserId);

      if (!chat) {
        chat = await ChatService.createChat(userId, toUserId, text);
      }
      // push new message correctly
      chat.messages.push({
        senderUserId: userId,
        text,
      });
      chat.save();
      io.to(hashRoomId).emit("messageReceived", {
        senderUserId: userId,
        firstName,
        lastName,
        photo,
        time,
        text,
      });
    } catch (error) {
      console.error(error.message);
    }
  };
}
module.exports = SocketEventHandler;
