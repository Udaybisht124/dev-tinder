const express = require("express");
const requestRouter = express.Router();
const Auth = require("../middlewares/auth");


requestRouter.post("/sendConnectionRequest",Auth,async(req,res)=>{
    const user = req.user;
    console.log('sending the connection request');
    
    res.send(user.firstName+"is sending the request!!!!");
    })
    


module.exports = requestRouter;