const express = require("express");
const requestRouter = express.Router();
const Auth = require("../middlewares/auth");


const { requestSend, requestReview } = require("../controllers/requestController");

requestRouter.post("/request/send/:status/:toUserId",Auth,requestSend)
    
requestRouter.post("/request/review/:status/:requestId",Auth,requestReview);

module.exports = requestRouter;


