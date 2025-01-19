const express = require("express");
const requestRouter = express.Router();
const Auth = require("../middlewares/auth");
const User = require("../models/user");
const ConnectionRequest = require("../models/requestModel");
const connectionRequest = require("../models/requestModel");

requestRouter.post("/request/send/:status/:toUserId",Auth,async(req,res)=>{
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        //check the only two status can be of connction request send
        const statusAllowed = ["interested","ignored"];
if(!statusAllowed.includes(status)){
    return res.status(400).json({
    message:"Invalid status type",
    success:false
    })
}

// //check the the another who can receive the sender developer request is present or not in a db
const isRecieverExist =await User.findById(toUserId);
if(!isRecieverExist){
    return res.status(400).json({
        message:"Reciever does not exist!!",
        success:false
    })
}
// //here we can also check the sender cannot send the connection request itself


// //here we can also check the there is an already an connection request send to reciver or reciever to send or not
const isRequestAlreadyExist = await connectionRequest.findOne({
    $or:[
        {fromUserId,toUserId},//this case is for a sender is already sent the conn request to the receiver 
        { fromUserId : toUserId , toUserId : fromUserId}//this line check the reciever that already have connection request of the same devloper so that reciver cannot send connection request to the sender
    ],
})


if(isRequestAlreadyExist){
    return res.status(400).json({
        message:'connection request already be exist',
        success:false,
    })
}


const data  = new ConnectionRequest({
fromUserId,
toUserId,
status,
})


// we have also want to save the connection data into db

const saveData = await data.save();

if(status === "interested"){
    res.status(200).json({
        message:req.user.firstName+" "+`${status}`+" "+"in"+" "+isRecieverExist.firstName+" Profile",
        success:true,
        data
    })
}
else{
    res.status(200).json({
        message:req.user.firstName+" "+`${status}`+" "+"the"+" "+isRecieverExist.firstName+" Profile",
        success:true,
        data
    })
}


} catch (error) {
        res.status(400).send("ERROR"+error.message);
    }
    })
    
requestRouter.post("/request/review/:status/:requestId",Auth,async(req,res)=>{
    try {
        const loggedInUser = req.user;
        const status = req.params.status;
        const requestId = req.params.requestId; 
        //validate only status should be a accepted or rejected
        const statusAllowed = ["accepted","rejected"];

        if(!statusAllowed.includes(status)){
            return res.status(400).send("Invalid status");
        }

        const connectionRequestData = await ConnectionRequest.findOne({
            _id:requestId,//here we can check the request id is present in our db
            toUserId:loggedInUser._id,
            status:"interested"
        })
if(!connectionRequestData){
    return res.status(404).
    json({
        message:"Invalid Connection Request",
        success:false
    })
}

connectionRequestData.status = status;
const data = await connectionRequestData.save();

res.status(200).json({
    message:loggedInUser.firstName+"is"+status+"the connection request",
    data
})


//uday send request to divya
//now we can check only divya can recieve the uda requeset means loggedinuserid = touserid
//status should always be a accepted
//request id should be a valid in db


    } catch (error) {
        res.status(400).send("ERROR"+error.message);
}}
)


module.exports = requestRouter;


