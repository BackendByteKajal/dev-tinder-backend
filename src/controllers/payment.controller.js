const { ErrorMessage, MEMBERSHIP_TYPE } = require("../constant");
const { PaymentSaveDto } = require("../dto");
const { PaymentModel, UserModel } = require("../models");
const instance = require("../utils/razorpay");
const {
  validateWebhookSignature,
} = require("razorpay/dist/utils/razorpay-utils");
class PaymentController {
  static async createOrder(req, res) {
    try {
      const user = req.user;
      const { memberShipType } = req.body;
      const amount = MEMBERSHIP_TYPE[memberShipType] * 100;
      const razorpayOrder = await instance.orders.create({
        amount: amount, //convert into paisa
        currency: "INR",
        receipt: "receipt#1",
        partial_payment: false,
        notes: {
          userId: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          memberShipType: memberShipType,
        },
      });

      const orderToSave = new PaymentSaveDto(razorpayOrder);
      console.log("orderToSave: ", orderToSave);
      const payment = new PaymentModel({ ...orderToSave, userId: user._id });
      let paymentSave = await payment.save();
      //convert mongoose document to plain javascript object
      paymentSave = paymentSave.toObject();
      console.log("orderSave : ", paymentSave);

      const data = {
        ...paymentSave,
        emailId: user.emailId,
        keyId: process.env.RAZORPAY_KEY_ID,
      };
      console.log(data, "data");
      res.status(200).json({
        success: true,
        message: "Order placed successfully",
        data: data,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: ErrorMessage.SomeThingWentWrong });
    }
  }
  static async verifyPayment(req, res) {
    try {
      console.log("webhook called");
      const webhookBody = req.body;
      console.log("webhookBody: ", webhookBody);
      const webhookSignature = req.headers["x-razorpay-signature"];
      console.log("webhookSignature: ", webhookSignature);
      const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
      console.log("webhookSecret: ", webhookSecret);
      const isValidateWebhookSignature = validateWebhookSignature(
        JSON.stringify(webhookBody),
        webhookSignature,
        webhookSecret
      );
      if (!isValidateWebhookSignature) {
        res
          .status(400)
          .json({ success: false, message: "Webhook Signature is invalid" });
      }
      const paymentDetail = webhookBody.payload.payment.entity;
      //update db
      const payment = await PaymentModel.findOne({
        orderId: paymentDetail.order_id,
      });
      //update payment order
      payment.status = paymentDetail.status;
      await payment.save();
      //update user
      await UserModel.findByIdAndUpdate(payment.userId, {
        isPremium: true,
        memberShipType: payment.notes.memberShipType,
      });

      //res
      res
        .status(200)
        .json({ success: true, message: "Payment Verifies SuccessFully" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: ErrorMessage.SomeThingWentWrong });
    }
  }
}

module.exports = PaymentController;
