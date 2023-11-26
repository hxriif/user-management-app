const mongoose = require("mongoose");
const adminschema = new mongoose.Schema({
  name: String,
  email: String,
  username: String,
  password: String,
});
module.exports = mongoose.model("admin", adminschema);
