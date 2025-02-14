const express = require("express");
const profileRouter = express.Router();
const Auth = require("../middlewares/auth");
const User = require("../models/user");
const { validateEditUserData } = require("../utils/validation");
const { TokenExpiredError } = require("jsonwebtoken");

profileRouter.get("/profile/view",Auth,async(req,res)=>{
const user = req.user;
res.send(user);
}

)



profileRouter.patch('/profile/edit',Auth, async (req, res) => {
     
  try {
    
if(!validateEditUserData(req)){
  return res.status(400).send("Invalid Edit Request");
  }

//get the user from req.user because we can attached the user in our auth middleware
const loggedInUser = req.user;

//now we write the logic for updating the field for update the profile of user
//in the below line we can make check the every field inside the req.body will equal to the every field of a req.body field
Object.keys(req.body).forEach((key) => {loggedInUser[key] = req.body[key]});

res.status(200).json({

  message:`${loggedInUser.firstName},your profile updated successfully`,
  success:true,
  data:loggedInUser

})

loggedInUser.save();
  } catch (error) {
    res.status(404).json({
    error:error,
    success:false
    })
  }

  });

profileRouter.post('/profile/forgot-password',Auth,async(req,res)=>{
  try {
    //first get the user from the req.user
    const user = req.user;
    //using the crypto library to generate a random reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    

  



  } catch (error) {
    res.status(400).send("error"+error.message);
  }
})

module.exports = profileRouter;