const express = require("express");
const router = express.Router();
const admincontroller=require('../controller/admincontroll')

const multer = require("multer")
const upload = multer({ dest: 'uploads/' })

const verifyToken=require('../middleware/authmiddleware')
const trycatchmiddle=require('../middleware/trycatchmiddleware')


router.use(express.json())
router.post('/Areg',trycatchmiddle(admincontroller.adminregister))
router.post('/Alog',trycatchmiddle(admincontroller.adminlogin))


router.post('/users',verifyToken, upload.single('photo'),trycatchmiddle(admincontroller.userRegister))
router.get('/users',verifyToken, trycatchmiddle(admincontroller.getAllUsers))
router.get('/users/:id',verifyToken, trycatchmiddle(admincontroller.getuserByid))
router.put('/users/:id',verifyToken, trycatchmiddle(admincontroller.updateuserbyid))
router.delete('/users/:id', verifyToken, trycatchmiddle(admincontroller.deleteUserByid))




module.exports=router