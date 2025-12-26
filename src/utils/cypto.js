const crypto = require("crypto");

const createSecretRoomId = (data) => {
  const hashRoomId = crypto.createHash("sha256").update(data).digest("hex");
  return hashRoomId;
};

module.exports = { createSecretRoomId };
