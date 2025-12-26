const { ErrorMessage } = require("../constant");

class ErrorMiddleware {
  static errorMiddleware(err, req, res, next) {
    console.error(
      "Error at:",
      new Date().toISOString(),
      req.method,
      req.url,
      err
    );

    return res.status(500).json({
      success: false,
      message: ErrorMessage.SomeThingWentWrong,
    });
  }
}

module.exports = ErrorMiddleware;
