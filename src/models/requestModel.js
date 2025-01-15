const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  fromUserId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  toUserId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  status: {
    type: String,
    enum: {
      values:["ignored","interested","accepted","rejected"],
   //if any one can pass the any other status accept the above written then it will the give error 
   message:`{VALUE} is invalid status type
   `   },
    required: true,
  },
 
},
{timestamps:true});


//we can also write some schema level middleware to handle the condition like sender dos,t send itself a connection request
//so for this we can use the mongoose pre middleware
requestSchema.pre("save",function(next){

  //get the connection request first
  const connectionRequest = this;
  //here i can check the toUserId is equal to a forUserId

  if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
    throw new Error("you cannot send connection request yourself");
  }
  next();

})


const connectionRequest = mongoose.model("connectionRequest",requestSchema);

module.exports = connectionRequest;