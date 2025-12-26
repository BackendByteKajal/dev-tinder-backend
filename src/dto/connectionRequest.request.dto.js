class ConnectionRequestDto {
  fromUserID;
  toUserId;
  constructor(ConnectionRequest) {
    this.fromUserID = ConnectionRequest.fromUserID;
    this.toUserId = ConnectionRequest.toUserId;
  }
}

module.exports = { ConnectionRequestDto };

