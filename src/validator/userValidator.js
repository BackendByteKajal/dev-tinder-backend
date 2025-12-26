const validator = require("validator");
const { ErrorMessage, ArrayConstant } = require("../constant");
class UserValidator {
  static userSignUp(req, res, next) {
    try {
      const { password, gender, emailId } = req.body;
      if (!validator.isStrongPassword(password)) {
        throw new Error(ErrorMessage.EnterStrongPassword);
      }

      if (!ArrayConstant.gender.includes(gender.toLowerCase())) {
        throw new Error(ErrorMessage.InvalidGender);
      }

      if (!validator.isEmail(emailId)) {
        throw new Error(ErrorMessage.InvalidEmail);
      }
      return next();
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
  }
  static editProfile = (req, res, next) => {
    try {
      const body = req.body;
      const allowedFields = [
        "firstName",
        "lastName",
        "gender",
        "photo",
        "skills",
        "age",
        "about",
      ];
      const requestEditFields = Object.keys(body);
      const isEditAllowed = requestEditFields.every((field) =>
        allowedFields.includes(field)
      );
      if (!isEditAllowed) {
        return res
          .status(400)
          .json({ success: false, message: ErrorMessage.EDIT_NOT_ALLOWED });
      }
      next();
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
  };
}

module.exports = { UserValidator };
