const User = require('../models/user');
const validateSignupData = require("../utils/validation");
const bcrypt = require("bcrypt");

const signup = async(req,res) =>{
    try {

        validateSignupData;
      
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
      
      } catch (error) {
      
        console.log("Error"+error);
        
      }
}


const login = async() =>{
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
}











module.exports = {signup,login}

