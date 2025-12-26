const socket = require("socket.io");
const initializedEvents = require("./socket/events/chat.events");
const initializedSocket = (server) => {
  try {
    const io = socket(server, {
      cors: {
        origin: "http://localhost:5173",
      },
    });
    //initialized Events
    initializedEvents(io);

    console.log("socket Initialized");
  } catch (error) {
    console.error(error.message);
    throw error.message;
  }
};
module.exports = initializedSocket;

//     // console.log("io",io);
//     io.on("connection", (socket) => {
//       //handle events
//       console.log("User connected:", socket.id);

//       socket.on("joinChat", async ({ userId, toUserId }) => {
//         try {
//           //check these were friends
//           const connection = await ConnectionRequestModel.findOne({
//             $or: [
//               { fromUserId: userId, toUserId: toUserId },
//               { fromUserId: toUserId, toUserId: userId },
//             ],
//             status: "accepted",
//           });

//           if (!connection) {
//             throw new Error("Connection Not Found");
//           }

//           const roomId = [userId, toUserId].sort().join("_");
//           //secure room id
//           const hashRoomId = createSecretRoomId(roomId);
//           //here user join room
//           socket.join(hashRoomId);
//         } catch (error) {
//           console.error(error.message);
//           throw error.message;
//         }
//       });

//       socket.on(
//         "sendMessage",
//         async ({
//           userId,
//           toUserId,
//           firstName,
//           lastName,
//           photo,
//           time,
//           text,
//         }) => {
//           try {
//             console.log(time);
//             const roomId = [userId, toUserId].sort().join("_");
//             //secure room id
//             const hashRoomId = createSecretRoomId(roomId);

//             //save chat in db
//             let chat = await ChatService.isChatExist(userId, toUserId);

//             if (!chat) {
//               chat = await ChatService.createChat(userId, toUserId, text);
//             }
//             // push new message correctly
//             chat.messages.push({
//               senderUserId: userId,
//               text,
//             });
//             chat.save();
//             io.to(hashRoomId).emit("messageReceived", {
//               senderUserId: userId,
//               firstName,
//               lastName,
//               photo,
//               time,
//               text,
//             });
//           } catch (error) {
//             console.error(error.message);
//           }
//         }
//       );

//       //  socket.on("disconnected", () => {});
//     });
//     console.log("socket Initialized");
//   } catch (error) {
//     console.error(error.message);
//     throw error.message;
//   }
// };
// module.exports = initializedSocket;
