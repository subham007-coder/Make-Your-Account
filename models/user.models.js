const mongoose = require("mongoose");
require('dotenv').config();

const uri = process.env.MONGODB_URL;

mongoose.connect(uri)
  .then(() => {
    console.log('Connected to MongoDB');
    // Your code after successful connection
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  image: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
