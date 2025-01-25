const express = require("express");
//here we can get the router from express
const authRouter = express.Router();
const validateSignupData = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");

//here we can write the signup api 
authRouter.post("/signup", async (req, res) => {
  //first we can validating the signup data
try {

  validateSignupData;

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

} catch (error) {

  console.log("Error"+error);
  
}

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

      //here we can make our code for readable by writing the logic of generating the j     wt token to schema methods 

      const token = await user.getJWT();

      //expires the cookie after 7 days

      res.cookie("token",token,{ maxAge: 7 * 24 * 60 * 60 * 1000});

      res.status(200).send(user)
    } else {
      res.status(404).send("Invalid Credentials") 
      }
  } catch (error) {
    console.log(error);
  }
});

  //here we can write the logout api for logout the user
  authRouter.post("/logout",(req,res)=>{
try {
  res.cookie("token",null,{expires:new Date(Date.now())})
res.status(200).send("User logout successfully!");
} catch (error) {
  console.log(error);
  
}

  })


module.exports = authRouter;


