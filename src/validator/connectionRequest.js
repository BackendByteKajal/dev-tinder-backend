const validator = require("validator");
const { ErrorMessage } = require("../constant");
class ConnectionRequestValidator {
  static ConnectionRequestSend(req, res, next) {
    try {
      const status = req.params.status;
      const allowed = ["ignored", "interested"];
      if (!allowed.includes(status)) {
        throw new Error(`${status} status not allowed`);
      }
      return next();
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
  static ConnectionReviewRequestSend(req, res, next) {
    try {
      const { status, requestId } = req.params;
      const isMongoId = validator.isMongoId(requestId);
      if (!["rejected", "accepted"].includes(status)) {
        throw new Error(ErrorMessage.INVALID_STATUS);
      }
      if (!isMongoId) {
        throw new Error(ErrorMessage.PLEASE_ENTER_VALID_REQUEST_ID);
      }
      next();
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}

module.exports = { ConnectionRequestValidator };
