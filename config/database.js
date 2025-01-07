const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://bishtuday4668:zK5EqUfxguIbqR26@namastenodejs.f4kzt.mongodb.net/dev-tinder"  );
      
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
