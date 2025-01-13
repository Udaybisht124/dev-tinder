const express = require("express");
const profileRouter = express.Router();
const Auth = require("../middlewares/auth");

profileRouter.get("/about",Auth,async(req,res)=>{

const user = req.user;
res.send(user);

}

)


module.exports = profileRouter;