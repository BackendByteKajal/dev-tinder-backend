class UserResponseDto {
  firstName;
  lastName;
  emailId;
  gender;
  password;
  photo;
  skills;
  age;
  about;
  _id;
  isPremium;
  memberShipType;
  constructor(userData) {
    this._id = userData._id;
    this.firstName = userData.firstName;
    this.lastName = userData.lastName;
    //this.emailId = userData.emailId;
    this.gender = userData.gender;
    this.lastName = userData.lastName;
    this.age = userData.age;
    this.skills = userData.skills;
    this.photo = userData.photo;
    this.about = userData.about;
    this.gender = userData.gender;
    this.isPremium = userData.isPremium;
    this.memberShipType = userData.memberShipType;
  }
}

module.exports = { UserResponseDto };
