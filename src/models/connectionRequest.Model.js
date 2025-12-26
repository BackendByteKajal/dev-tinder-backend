const mongoose = require("mongoose");
const { ArrayConstant } = require("../constant/array.constant");
const { UserModel } = require("./userModel");
const { ErrorMessage } = require("../constant");
const { Schema } = mongoose;

const connectionRequestSchema = new Schema(
  {
    fromUserId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    toUserId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    status: {
      type: String,
      required: true,

      enum: {
        values: ArrayConstant.connectionRequestStatus,
        message: `{VALUE} is invalid status`,
      },
    },
  },
  { timestamps: true }
);

connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 }, { unique: true });

connectionRequestSchema.pre("save", function (next) {
  try {
    const connectionRequest = this;
    if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
      throw new Error(
        ErrorMessage.YOU_CANNOT_SEND_CONNECTION_REQUEST_TO_YOURSELF
      );
    }
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
});

const ConnectionRequestModel = mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);

module.exports = { ConnectionRequestModel };
