class ProfileEditDto {
  firstName;
  lastName;
  gender;
  photo;
  skills;
  constructor(userData) {
    this.firstName = userData.firstName;
    this.lastName = userData.lastName;
    this.gender = userData.gender;
    this.lastName = userData.lastName;
    this.skills = userData.skills;
    this.photo = userData.photo;
    this.age = userData.age;
    this.about = userData.about;
  }
}

module.exports = { ProfileEditDto };
