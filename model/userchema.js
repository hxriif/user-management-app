const mongoose = require("mongoose");
const userschema = new mongoose.Schema({
  name: String,
  email: String,
  username: String,
  password: String,
  photo: String,
});
module.exports = mongoose.model("user", userschema);
