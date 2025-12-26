const { ErrorMessage } = require("../constant");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/userModel");
class AuthMiddleware {
  static async authMiddleware(req, res, next) {
    try {
      const token = req.cookies.token;
      if (!token) {
        return res.status(401).json({
          success: false,
          message: ErrorMessage.USER_NOT_AUTHENTICATE,
        });
      }
      const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
      if (!decode?.userId) {
        return res.status(401).json({
          success: false,
          message: ErrorMessage.USER_NOT_AUTHENTICATE,
        });
      }
      const userId = decode.userId;
      const userData = await UserModel.findById(userId);
      if (!userData) {
        return res.status(401).json({
          success: false,
          message: ErrorMessage.USER_NOT_AUTHENTICATE,
        });
      }
      req.user = userData;
      return next();
    } catch (error) {
      console.error(error.message);
      res.status(401).json({
        success: false,
        message: ErrorMessage.USER_NOT_AUTHENTICATE,
      });
    }
  }
}

module.exports = { AuthMiddleware };
