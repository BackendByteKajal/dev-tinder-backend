const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
  {
    paymentId: {
      type: String,
    },
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    status: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    amountDue: {
      type: Number,
      required: true,
    },
    attempts: {
      type: Number,
      required: true,
    },
    attempts: {
      type: Number,
      required: true,
    },
    razorpayCreatedAt: {
      type: Number,
    },
    currency: {
      type: String,
      required: true,
    },
    entity: {
      type: String,
      required: true,
    },
    notes: {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
      },
      firstName: {
        type: String,
        trim: true,
      },
      lastName: {
        type: String,
        trim: true,
      },
      memberShipType: {
        type: String,
      },
    },
  },
  { timestamps: true }
);
PaymentSchema.pre("save", function (next) {
  try {
    console.log(`${this.orderId} details save in Database..`);
    next();
  } catch (error) {
    console.error(error);
  }
});
const PaymentModel = mongoose.model("Payment", PaymentSchema);
module.exports = PaymentModel;
