const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
 
  email: {
    type: String,
    required: true,
    unique: true, 
    lowercase: true, 
  },
  password: {
    type: String,
    required: true,
  },
  profilePic:{
    type:String,
    default:"https://st.depositphotos.com/1015682/2086/i/450/depositphotos_20867981-stock-photo-earth-at-night-with-city.jpg"
  }
});


const User = mongoose.model('User', userSchema);

module.exports = User;
