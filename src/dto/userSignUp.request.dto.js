class UserSignUpDto {
  firstName;
  lastName;
  emailId;
  gender;
  password;
  photo;
  skills;
  about;
  age;
  constructor(userData) {
    this.firstName = userData.firstName;
    this.lastName = userData.lastName;
    this.emailId = userData.emailId;
    this.gender = userData.gender;
    this.lastName = userData.lastName;
    this.password = userData.password;
    this.skills = userData.skills;
    this.age = userData.age;
    this.about = userData.about;
    this.photo = userData.photo;
  }
}

module.exports = { UserSignUpDto };
