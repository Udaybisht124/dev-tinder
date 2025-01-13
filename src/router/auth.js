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

//here we can write the login router 
authRouter.post("/login",async (req,res)=>{
    try {
      //first of all get the email and password from the user
      const { email, password } = req.body;
  
      //then check email provided by the user is present in the db or not
      const user = await User.findOne({ email: email });
      if (!user) {
        res.status(404).send("invalid credantials");
      }
  
      //if user email is find in db then we can match the password with the db stored password
  
      const isPasswordValid = await user.validatePASSWORD(password);
      if (isPasswordValid) {
        //here we can generate the jwt token
  
        //here we can make our code for readable by writing the logic of generating the jwt token to schema methods 
  
        const token = await user.getJWT();
  
  
        //expires the cookie after 7 days
  
        res.cookie("token",token,{ maxAge: 7 * 24 * 60 * 60 * 1000});
  
        res.status(200).send("user login successfully");
      } else {
        res.status(404).send("Invalid Credentials") 
        }
    } catch (error) {
      console.log(error);
    }
  });






module.exports = authRouter;


