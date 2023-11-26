require("dotenv").config()
const mongoos = require("mongoose");
const User = require("../model/userchema");
const Admin = require("../model/adminschema");
const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken')

mongoos.connect("mongodb://0.0.0.0:27017/mongotask-2", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = {
  adminregister: async (req, res) => {
    try {
      const hasheppassword = await bcrypt.hash(req.body.password, 10);
      const { username, name, email } = req.body;
      console.log(username);
      await Admin.create({
        name: name,
        email: email,
        username: username,
        password: hasheppassword,
      });
      res.json({ message: "admin successfully registered" });
    } catch {
      res.status(500).send();
    }
  },
  adminlogin: async (req, res) => {
    try {
      const { username, password } = req.body;
      const admin = await Admin.findOne({
        username: username,
      });
      if (!admin) {
        res.status(401).json({ status: "failure", message: "not an admin" });
      }
      const passwordMatch = await bcrypt.compare(password, admin.password);
      if (!passwordMatch) {
        res
          .status(401)
          .json({ status: "failure", message: "invalid password" });
      }
      const token = jwt.sign(
        { username: admin.username },
        process.env.ACCES_TOKEN_SECRET
      );
      res.json({ message: "Login successful", token });
    } catch (error) {
      console.log(error);

      res.status(500).send();
    }
  },
  userRegister: async (req, res) => {
    const { name, email, username } = req.body;
    const photo = req.file ? req.file.filename : "";
    await User.create({
      name: name,
      email: email,
      username: username,
      photo: photo,
    });

    res.json({ message: "User creation succesfull!" });

    res.status(500).send();
  },
  getAllUsers: async (req, res) => {
    try {
      const allusers = await User.find();
      res.status(200).json({
        status: "Succes",
        message: "Succesfully fetched user data",
        data: allusers,
      });
    } catch {
      res.status(500).send();
    }
  },
  getuserByid: async (req, res) => {
    try {
      const userid = req.param.id;
      const user = await User.findById(userid);
      if (!user) {
        res.status(404).json({ Error: "failed to find  user" });
      }
      res.status(200).json({
        status: "success",
        message: "Succesfully fetched use data",
        data: user,
      });
    } catch {
      res.status(500).json({ Error: "internal server error" });
    }
  },
  updateuserbyid: async (req, res) => {
    try {
      const userid = req.param.id;
      const { username, name, email } = req.body;
      const user = await User.findByIdAndUpdate(userid, {
        $set: { name, username, email },
      });
      if (!user) {
        res.status(404).json({ error: "user not found" });
      }
      res.json({ message: "User update succesfully" });
    } catch {
      res.status(500).json({ Error: "internal sever error" });
    }
  },
  deleteUserByid: async (req, res) => {
      try {
          const userid = req.params.id;
        //   console.log(userid)
      const user = await User.findByIdAndDelete(userid);
    //   console.log(user)
      if (!user) {
       return res.status(404).send({ er: "user not fount" });
      }
       res.json({ mesage: "User deleted succsfully" });
    } catch(error) {
        console.log(error)
      res.status(500).send({ erro: "server err" });
    }
  },
};
