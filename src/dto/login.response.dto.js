class LoginResponseDto {
  firstName;
  lastName;
  emailId;
  gender;
  password;
  photo;
  skills;
  _id;
  isPremium;
  memberShipType;
  constructor(userData) {
    this._id = userData._id;
    this.firstName = userData.firstName;
    this.lastName = userData.lastName;
    this.emailId = userData.emailId;
    this.gender = userData.gender;
    this.lastName = userData.lastName;
    this.skills = userData.skills;
    this.photo = userData.photo;
    this.isPremium = userData.isPremium;
    this.memberShipType = userData.memberShipType;
  }
}

module.exports = { LoginResponseDto };
