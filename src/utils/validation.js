
const validator = require('validator');
const { validate } = require('../models/user');
const validateSignupData = (req) => {

const {firstName,lastName,email,password} = req.body;

if (!firstName || !lastName || !email || !password) {
    throw new Error('please enter all field')
}
  // Password validation
  if (!validator.isLength(password, { min: 8, max: 20 })) { 
    throw new Error('Password must be between 8 and 20 characters long');
  }
  
//if our email is not valid then error will come
else if(!validator.isEmail(email)){
    throw new Error('email is not valid');
}
else if(!validator.isStrongPassword(password)){
    throw new Error('please enter a strong  password');
}
}

const validateEditUserData = (req) =>{
  try {
    
const isFieldEditable = ["firstName","age","lastName","photoUrl","gender","about","skills"];

const isEditProfileAllowed = Object.keys(req.body).every(field => isFieldEditable.includes(field));

return isEditProfileAllowed;

  } catch (error) {
    res.status(404).send("Error message"+error);
  }
}
module.exports ={
  validateEditUserData,
validateSignupData
}