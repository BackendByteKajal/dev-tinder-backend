const express = require("express");
const authRouter = express.Router();
const { UserValidator } = require("../validator");
const { ErrorMessage, Message } = require("../constant");
const { UserModel } = require("../models/userModel");
const { LoginResponseDto } = require("../dto");
const bcrypt = require("bcrypt");
const { UserResponseDto, UserSignUpDto } = require("../dto");

authRouter.post("/signUp", UserValidator.userSignUp, async (req, res) => {
  try {
    const userData = new UserSignUpDto(req.body);
    const user = new UserModel(userData);
    const saveUser = await user.save();
    //create jwt token
    const token = await saveUser.createJwt();
    // send cookies in response
    const isProd = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
    });

    const response = new UserResponseDto(saveUser);
    res.json({ message: Message.USER_CREATED, data: response });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: ErrorMessage.SomeThingWentWrong });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const userData = await UserModel.findOne({ emailId: emailId });
    if (!userData) {
      return res.status(404).json({ message: ErrorMessage.InvalidCredentials });
    }
    const isPasswordMatch = await userData.validateUserPassword(password);
    console.log(isPasswordMatch );
    if (isPasswordMatch) {
      const loginUser = new LoginResponseDto(userData);
      //create jwt token
      const token = await userData.createJwt();
      // send cookies in response
      const isProd = process.env.NODE_ENV === "production";
      console.log("isProd : ", isProd);

      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "none" : "lax",
      });
      return res
        .status(200)
        .json({ message: Message.LOGIN_SUCCESSFUL, data: loginUser });
    }
    return res.status(401).json({ message: ErrorMessage.InvalidCredentials });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: ErrorMessage.SomeThingWentWrong });
  }
});

authRouter.get("/logout", (req, res) => {
  try {
    res
      .cookie("token", null, { expires: new Date(0) })
      .json({ success: true, message: Message.LOGOUT_SUCCESSFUL });
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ success: false, message: ErrorMessage.SomeThingWentWrong });
  }
});
module.exports = { authRouter };
