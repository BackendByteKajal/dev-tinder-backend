const { connection } = require("mongoose");

module.exports.ArrayConstant = {
  gender: ["male", "female", "other"],
  connectionRequestStatus: ["ignored", "accepted", "rejected", "interested"],
};
