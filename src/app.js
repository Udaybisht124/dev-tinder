const express = require("express");
const validator = require("validator");

const cookieParser = require("cookie-parser");
//create an express application instance
const jwt = require("jsonwebtoken");
const app = express();
const User = require("../models/user");
const dotenv = require("dotenv");
const connectDB = require("../config/database");
const user = require("../models/user");
const Auth = require("../middlewares/auth");
const signupValidation = require("../utils/validation");
const bcrypt = require("bcrypt");

//listen the server or app on some port to listen the incoming request to the server

//if we want to reply the same message for all incoming request to the server now we can use the request handler
//using the express.json middleware to parse the incoming request body as josn

app.use(express.json());
app.use(cookieParser());
app.post("/signup", async (req, res) => {
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

//create a login api here
app.post("/login", async (req, res) => {
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

//create a /user get api for get all the user in the database by emaid id
app.get("/users", async (req, res) => {
  const userEmail = req.body.email;
  try {
    const userdata = await User.findOne({});
    res.send(userdata);
  } catch (error) {
    console.log(error);
  }
});


app.post("/sendConnectionRequest",Auth,async(req,res)=>{
const user = req.user;
console.log('sending the connection request');

res.send(user.firstName+"is sending the request!!!!");
})




app.get("/about",Auth,async (req, res) => {
  try {
   const user = req.user;
res.send(user);
  
  } catch (error) {
    console.log(error);
  }
});

connectDB().then(() => {
  console.log("database connected");

  app.listen(7000, () => {
    console.log("app is listening on port 7000");
  });
});
