const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: [4, "please enter firstName greater than 3"],
      maxLength: [20, "firstName length cannot be greater than 20"], // Fixed typo in message
      lowercase: true,
      index: true,
    },
    lastName: {
      type: String,
      required: true,
      uppercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("invalid email address: " + value);
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://tse2.mm.bing.net/th?id=OIP.7cRYFyLoDEDh4sRtM73vvwHaDg&pid=Api&P=0&h=180",
      validate(value) {
        // Relax URL validation to allow longer URLs, require_protocol ensures http/https is present
        if (!validator.isURL(value, { require_protocol: true, allow_underscores: true })) {
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
      validate(value) {
        if (!["male", "female", "other"].includes(value)) { // Fixed validation logic
          throw new Error("invalid gender: " + value);
        }
      },
    },
  },
  { timestamps: true }
);

// JWT generation method
userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "DEV-TINDER021");
  return token;
};

// Password validation method (Note: This has a bug, fixed below)
userSchema.methods.validatePASSWORD = async function (passwordEnterByUser) {
  const user = this;
  const hashedPassword = user.password;

  // Use bcrypt.compare instead of bcrypt.hash for validation
  const isPasswordValid = await bcrypt.compare(passwordEnterByUser, hashedPassword);

  return isPasswordValid;
};

module.exports = mongoose.model("User", userSchema);