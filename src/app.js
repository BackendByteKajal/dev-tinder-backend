const express = require("express");
const http = require("http");
require("dotenv").config();
const { connectDb } = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
require("./utils/cronjob");
const {
  authRouter,
  profileRouter,
  requestRouter,
  userRouter,
  paymentRouter,
  webhookRouter,
  connectionRouter,
  chatRouter,
} = require("./routes");

const cors = require("cors");
const initializedSocket = require("./utils/socket");
const { ErrorMiddleware } = require("./middleware");
app.use(
  cors({
    origin: process.env.REACT_URL,
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  console.log(new Date() + " " + req.method + req.url);
  next();
});

app.use("/auth", authRouter);
app.use("/profile", profileRouter);
app.use("/request", requestRouter);
app.use("/user", userRouter);
app.use("/payment", paymentRouter);
app.use("/webhook", webhookRouter);
app.use("/chat", chatRouter);
app.use("/connection", connectionRouter);
app.use(ErrorMiddleware.errorMiddleware);

//create server
const server = http.createServer(app);
//initialized Socket
initializedSocket(server);

const port = process.env.PORT;
connectDb()
  .then(() => {
    server.listen(port, () => {
      console.log(`Server is running at port ${port}`);
    });
  })
  .catch(console.error);
