const express = require("express");
//here we can get the router from express
const authRouter = express.Router();
const signupValidation = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");

authRouter.post("/signup", async (req, res) => {
  //first we can validating the signup data
  signupValidation(req);

  const { firstName, lastName, email, password } = req.body;
  //now we can do hashed our password using bcrypt package
  const passwordHashed = await bcrypt.hash(password, 10);

  const userData = await new User({
    firstName,
    lastName,
    email,
    password: passwordHashed,
  });

  //now save the user into the database
  await userData.save();

  res.status(200).send("user registered successfully");
});











module.exports = authRouter;


