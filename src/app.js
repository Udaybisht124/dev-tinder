const express = require("express");
const validator = require("validator");

const cookieParser = require("cookie-parser");
//create an express application instancee
const jwt = require("jsonwebtoken");
const app = express();
const User = require("./models/user");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const authRouter = require("./router/auth");
const profileRouter = require("./router/profile");
const requestRouter = require("./router/request");
const userRouter = require("./router/user");
const cors = require("cors");


//listen the server or app on some port to listen the incoming request to the server

//if we want to reply the same message for all incoming request to the server now we can use the request handler
//using the express.json middleware to parse the incoming request body as josn
//using the cors middleware so that one domain can share resources of another domain
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}
));
app.use(express.json());
app.use(cookieParser());

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);


//create a login api here

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


connectDB().then(() => {
  console.log("database connected");

  app.listen(7000, () => {
    console.log("app is listening on port 7000");
  });
});
