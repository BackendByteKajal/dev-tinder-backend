class ConnectionRequestResponseDto {
  _id;
  fromUserId;
  toUserId;
  status;
  constructor(ConnectionRequest) {
    this._id = ConnectionRequest._id;
    this.fromUserId = ConnectionRequest.fromUserId;
    this.toUserId = ConnectionRequest.toUserId;
    this.status = ConnectionRequest.status;
  }
}

module.exports = { ConnectionRequestResponseDto };
