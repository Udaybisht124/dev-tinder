const express = require("express");
const Auth = require("../middlewares/auth");
const userRouter = express.Router();
const ConnectionRequest = require("../models/requestModel");
const User = require("../models/user");
const { set } = require("mongoose");
const USER_SAVE_DATA = ["firstName","lastName","age","gender","about","photoUrl","skills"];
userRouter.get("/user/request/receive", Auth, async (req, res) => {

  
  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    })
      //here we can get the user details who can send the connections to the paricular user
      .populate("fromUserId",USER_SAVE_DATA);
    res.status(200).json({
      message: "data fetched successfully!!!!",
      data: connectionRequest,
    });
  } catch (error) {
    res.status(400).json({
      message: "ERROR" + error,
    });
  }
});


userRouter.get("/user/connections", Auth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId",USER_SAVE_DATA)
      .populate("toUserId",USER_SAVE_DATA);

    console.log(connectionRequests);

    const data = connectionRequests.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });

    res.json({ data });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});


userRouter.get("/feed", Auth, async (req, res) => {
  try {

    
    const loggedInUser = req.user;
    const page = req.query.page || 1;
    let limit = req.query.limit || 10;
 limit = limit > 50 ? 50 : limit;
 
    const skip = (page - 1) * limit;



    const connectionRequests = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId  toUserId");

    const hideUsersFromFeed = new Set();
    connectionRequests.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });

    //here we can restrict the user from feed who can send the reuest or recieve and himhelp a user
    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select(USER_SAVE_DATA).skip(skip).limit(limit); //here i can restrict only specific document come inside the query
      
    res.json({ data: users });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
module.exports = userRouter;
