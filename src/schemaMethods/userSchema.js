const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

class UserSchemaMethods {
  static getToken = async function () {
    try {
      const user = this;
      const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "8h",
      });
      return token;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  };
  static validateUserPassword = async function (enterPassword) {
    try {
      const user = this;
      const passwordHash = user.password;
      const isPasswordMatch = await bcrypt.compare(enterPassword, passwordHash);
      return isPasswordMatch;
    } catch (error) {
      console.error(error.message);
      throw error.message;
    }
  };
  static hashPassword = async function (next) {
    try {
      const user = this;
      const password = user.password;
      const saltRound = 10;
      const hashPassword = await bcrypt.hash(password, saltRound);
      this.password = hashPassword;
      next();
    } catch (error) {
      console.error(error.message);
      throw error.message;
    }
  };
}

module.exports = { UserSchemaMethods };
