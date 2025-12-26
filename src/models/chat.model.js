const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    senderUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

const ChatSchema = new mongoose.Schema(
  {
    participants: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    ],
    messages: [MessageSchema],
  },
  { timestamps: true }
);

ChatSchema.post("save", function (next) {
  console.log("New Chat Created" + this);
  next;
});

const ChatModel = mongoose.model("Chat", ChatSchema);

module.exports = ChatModel;
