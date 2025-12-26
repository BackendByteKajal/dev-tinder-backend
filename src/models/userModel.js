const mongoose = require("mongoose");
const validator = require("validator");
const { UserSchemaMethods } = require("../schemaMethods");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      minLength: 2,
      maxLength: 50,
    },
    lastName: {
      type: String,
      minLength: 2,
      maxLength: 50,
      trim: true,
      lowercase: true,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minLength: 4,
      maxLength: 50,
    },
    gender: {
      type: String,
      lowercase: true,
    },
    password: {
      type: String,
    },
    age: {
      type: Number,
      min: 18,
      max: 50,
    },
    photo: {
      type: String,
      minLength: 5,
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid Url");
        }
      },
    },
    skills: {
      type: [String],
      validate(array) {
        if (array.length > 3) {
          throw new Error("More than 3 skills not allowed");
        }
      },
    },
    about: {
      type: String,
      max: 100,
      min: 2,
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    memberShipType: {
      type: String,
    },
  },
  { timestamps: true }
);

UserSchema.methods.createJwt = UserSchemaMethods.getToken;
UserSchema.methods.validateUserPassword =
  UserSchemaMethods.validateUserPassword;

UserSchema.pre("save", UserSchemaMethods.hashPassword);
UserSchema.pre("validate", function (next) {
  next();
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = { UserModel };
