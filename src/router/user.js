const express = require("express");
const Auth = require("../middlewares/auth");
const userRouter = express.Router();

const { requestReceive, userConnections, feed } = require("../controllers/userController");

userRouter.get("/user/request/receive", Auth,requestReceive);


userRouter.get("/user/connections", Auth,userConnections);


userRouter.get("/feed", Auth,feed);
module.exports = userRouter;
