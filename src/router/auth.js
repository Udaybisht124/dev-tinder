const express = require("express");
const { login, signup } = require("../controllers/authController");
//here we can get the router from express
const authRouter = express.Router();

//here we can write the signup api 
authRouter.post("/signup", signup);
//here we can write the login router 
authRouter.post('/login',login);

  //here we can write the logout api for logout the user
  authRouter.post("/logout",()=>{
    try {
      // mistake: i forgot to return the response
      res.cookie("token", null, { expires: new Date(Date.now()) });
      res.status(200).send("User logout successfully!");
    } catch (error) {
      // mistake: i forgot to log the error or return the error response
      console.log(error);
      res.status(500).send(error.message);
    }
  })


module.exports = authRouter;


