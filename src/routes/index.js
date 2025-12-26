const { authRouter } = require("./auth.routes");
const chatRouter = require("./chat.route");
const connectionRouter = require("./connection.router");
const paymentRouter = require("./payment.routes");
const { profileRouter } = require("./profile.routes");
const { requestRouter } = require("./request.routes");
const { userRouter } = require("./userRoutes.routes");
const webhookRouter = require("./webhook.routes");

module.exports = {
  authRouter,
  profileRouter,
  requestRouter,
  userRouter,
  paymentRouter,
  webhookRouter,
  connectionRouter,chatRouter
};
