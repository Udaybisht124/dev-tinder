const express = require("express");
//create an express application instance
const app = express();
const User = require("../models/user");
const connectDB = require("../config/database");
const user = require("../models/user");

//listen the server or app on some port to listen the incoming request to the server

//if we want to reply the same message for all incoming request to the server now we can use the request handler
//using the express.json middleware to parse the incoming request body as josn

app.use(express.json());

// app.use((req,res)=>{
//     res.send("hello from server");
// })

//create a signup api to send the data dynamic to the database
app.post("/signup", (req, res) => {
 
  try {
    const { firstName, lastName, email, password } = req.body;
    const userData = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    });
  
   
      userData.save();
      res.status(200).json({
        message: "user created successfully",
        success: true,
      });
       
  } catch (error) {
    console.log(error);
    
  }})

//create a /user get api for get all the user in the database by emaid id
app.get("/users", async (req, res) => {
  const userEmail = req.body.email;
  try {
    const userdata = await User.findOne({});
    res.send(userdata);
  } catch (error) {
    console.log(error);
  }
});

//feed api to get the all the user
app.get("/feed", async (req, res) => {
  try {
    const userData = await User.find({});
    if (!userData) {
      res.status(404).send("users not found");
    } else {
      res.send(userData);
    }
  } catch (error) {
    console.log(error);
  }
});

//api for getting the user by id
app.get("/user/:id", async (req, res) => {
  const id = req.params.id;

  try {
    // console.log(id);

    await User.findById(id).then((data) => {
      res.status(200).send(data);
    });
  } catch (error) {
    console.log(error);
  }
});

//delte the user by id and deleted from the collection
// here we can use the mongoose model.findbyidanddelete method to delete the particular document
app.delete("/delete/:_id", async (req, res) => {
  const id = req.params;

  try {
    console.log(id);

    await User.findByIdAndDelete(id).then((data) => {
      res.status(200).send("user deleted successfully");
    });
  } catch (error) {
    console.log(error);
  }
});

app.delete("/delete", async (req, res) => {
  try {
    const userEmail = req.body.email; // Assuming email is sent in the request body

    const deleteUser = await User.findOneAndDelete({ email: userEmail });

    if (deleteUser) {
      res.status(200).send("User deleted successfully");
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while deleting the user.");
  }
});

//delete one document that specify the condition first
app.delete("/deleteOne", async (req, res) => {
  try {
    const emailUser = req.body.email;
    console.log(emailUser);

    const deleteUser = await User.deleteOne({ email: emailUser });
    if (deleteUser) {
      res.send("one document deleted successfully");
    }
  } catch (error) {
    console.log(error);
  }
});

//countDocuments method in mongoose
app.get("/count", async (req, res) => {
  try {
    await User.countDocuments({ email: "krishna@gmail.com" }).then((count) => {
      console.log(count);
      res.send(`${count}`);
    });
  } catch (error) {
    console.log(error);
  }
});

//update data of a user
app.patch("/userupdate", (req, res) => {
  try {

    const userId = req.body.userId;
    const data = req.body;
//findbyIdAndUpdate AND FindOneAndUpdate both the method are same as its working
    // User.findByIdAndUpdate(userId,data,)
    
    User.findByIdAndUpdate({_id:userId},data,{returnDocument:"after"})
    //by using the third parameter of a findbyidupdate method in returndocument 
    //by using before for third parameter value we get the old data from collection then old one can return 
    //by using after for third parameter value  then first data updated first then return the updated data

    .then((data)=>{
      console.log(data);
      
        res.send("user updated successfully");
    })
  } catch (error) {
    console.log(error);
  }
});

//api for deleting the multiple document in the collection

app.delete('/deletemultiple',async(req,res)=>{
  try {
    const userEmail = req.body.email;
    await User.deleteMany({email:userEmail})
    .then((data)=>{
      res.status(200).send('multiple document deleted successfully');
      
    })

  } catch (error) {
    console.log(error);
    
  }
})



connectDB().then(() => {
  console.log("database connected");

  app.listen(7000, () => {
    console.log("app is listening on port 7000");
  });
});
