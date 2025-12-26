const express = require("express");
const { AuthMiddleware } = require("../middleware");
const { Message, ErrorMessage } = require("../constant");
const profileRouter = express.Router();
const { UserResponseDto, ProfileEditDto } = require("../dto");
const { UserValidator } = require("../validator");
const { UserModel } = require("../models/userModel");

profileRouter.get("/", AuthMiddleware.authMiddleware, async (req, res) => {
  try {
    const user = req.user;
    const profile = new UserResponseDto(user);
    res.status(200).json({
      success: true,
      message: Message.USER_PROFILE_FETCH,
      data: profile,
    });
  } catch (error) {
    console.error("error: ", error);
    res
      .status(500)
      .json({ success: false, message: ErrorMessage.SomeThingWentWrong });
  }
});

profileRouter.patch(
  "/edit",
  AuthMiddleware.authMiddleware,
  UserValidator.editProfile,
  async (req, res) => {
    try {
      const editProfileData = req.body;
      const user = req.user;
      const patchData = new ProfileEditDto(editProfileData);
      const patchProfile = await UserModel.findByIdAndUpdate(
        user._id,
        patchData,
        { runValidator: true, returnDocument: "after" }
      );
      const response = new UserResponseDto(patchProfile);
      res.status(200).json({
        success: true,
        message: Message.PROFILE_EDIT_SUCCESSFULLY,
        data: response,
      });
    } catch (error) {
      console.error("error: ", error);
      res
        .status(500)
        .json({ success: false, message: ErrorMessage.SomeThingWentWrong });
    }
  }
);

module.exports = { profileRouter };
