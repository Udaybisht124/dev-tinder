const express = require("express");
const profileRouter = express.Router();
const Auth = require("../middlewares/auth");
const { profileView, profileEdit, profileForgotPassword } = require("../controllers/profileController");


profileRouter.get("/profile/view",Auth,profileView);

profileRouter.patch('/profile/edit',Auth,profileEdit);

profileRouter.post('/profile/forgot-password',Auth,profileForgotPassword);

module.exports = profileRouter;