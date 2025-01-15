const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//here we can import the validator library for string validations and sanitisors
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
  return emailRegex.test(email);
}
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: [4, `please enter firstName greater than 3`],
      maxLength: [20, `firstName length cannot be greater then 8`],
      lowercase: true,
    },

    lastName: {
      type: String,
      required: true,
      uppercase: true,
    },

    // we can use the lowercase to convert all uppercase letter to lowercase enter by user and trim to remove all unwanted spaces

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      //here we can validate the email
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("invalide email address" + value);
        }
      },
    },

    photoUrl: {
      type: String,
      default:
        "https://tse2.mm.bing.net/th?id=OIP.7cRYFyLoDEDh4sRtM73vvwHaDg&pid=Api&P=0&h=180",
      validate(value) {
        if (!validator.isURL(value, { require_protocol: true })) {
          throw new Error("Invalid photo URL: " + value);
        }
      },
    },

    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
    },
    about: {
      type: String,
      default: "this is the about page",
    },
    skills: {
      type: [String],
    },
    gender: {
      type: String,
    //  enum:{
    //   values:["male","female","other"],
    //   message:`{VALUE} gender is not supported`
    //  }
      validate(value) {
        if (!["mail", "female", "other"]) {
          throw new Error("invalid gender");
        }
      },
    },
  },
  //here we can also used the timestamps to get the created and updated date time of schema
  { timestamps: true }
);

//here we can make also a some helper function  or schema method for specific model like user
//always use a normal javascript function here because this is not work with the arrow function
//here this is reference to the current user or we can say that instance of a user model
userSchema.methods.getJWT = async function () {
  //here we can get the user from this
  const user = this;

  const token = await jwt.sign({ _id: user._id }, "DEV-TINDER021");

  return token;
};

userSchema.methods.validatePASSWORD = async function (passwordEnterByUser) {
  const user = this;
  const hashedPassword = user.password;

  const isPasswordValid = await bcrypt.hash(
    passwordEnterByUser,
    hashedPassword
  );

  return isPasswordValid;
};

module.exports = mongoose.model("User", userSchema);
