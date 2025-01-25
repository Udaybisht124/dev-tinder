
const jwt = require("jsonwebtoken");
const User = require("../models/user");


const authentication = async(req,res,next) =>{

    try {
      
  //extract the token first from req object inside cookies
  const cookie = req.cookies;
  const {token} = cookie;

  //do the validation for token 

if(!token){
    res.status(401).send("please Loggin")
}

  //decode the token
  const decodeObj = await jwt.verify(token,"DEV-TINDER021");

  const {_id} = decodeObj;
  
  //find a user by _id
  const user = await User.findById({_id});
if(!user){
res.status(200).send( 'user is not found');
}
//attached the user with the request object
req.user = user;
next();
    } catch (error) {
        console.log(error);
        
    }

}


module.exports = authentication;