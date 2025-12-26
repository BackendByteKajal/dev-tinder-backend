const SocketEventHandler = require("../event-handler/chat.event.handler");
const initializedEvents = (io) => {
  try {
    io.on("connection", (socket) => {
      //handle events

      socket.on("joinChat", async ({ userId, toUserId }) => {
        SocketEventHandler.joinChatEventHandler({ socket, userId, toUserId });
      });

      socket.on(
        "sendMessage",
        async ({
          userId,
          toUserId,
          firstName,
          lastName,
          photo,
          time,
          text,
        }) => {
          SocketEventHandler.SendMessageEventHandler({
            io,
            socket,
            userId,
            toUserId,
            firstName,
            lastName,
            photo,
            time,
            text,
          });
        }
      );
    });
    console.log("socket Initialized Events");
  } catch (error) {
    console.error(error.message);
    throw error.message;
  }
};
module.exports = initializedEvents;
