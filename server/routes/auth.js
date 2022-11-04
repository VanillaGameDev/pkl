const { Router } = require("express");
const router = Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AuthMiddleware = require('../middlewares/auth.middleware')

const authMiddleware = new AuthMiddleware()
  
//register
router.post("/register", authMiddleware.register, async (req, res) => {
  try {
    const { username, password, fullname, gender, } = req.body;
    if (!username || !password || !fullname || !gender) {
      return res.json({
        status: "bad",
        msg: "username atau password kosong",
      });
    }
    if (username.length < 4) {
      return res.json({
        status: "bad",
        msg: "username minimal 4 huruf",
      });
    }
    if (username.length > 20) {
      return res.json({
        status: "bad",
        msg: "username max 20 huruf",
      });
    }
    if (username ===  process.env.ADMIN_LOGIN) {
      return res.json({
        status: "bad",
        msg: "Nama pengguna ini tidak dapat digunakan",
      });
    }
    
    if (password.trim().length > 20) {
      return res.json({
        status: "bad",
        msg: "password max 20 huruf",
      });
    }
    if (password.trim().length < 4) {
      return res.json({
        status: "bad",
        msg: "password minimal 4 huruf",
      });
    }
    const existUser = await User.findOne({ username });

    if (existUser) {
      return res.json({
        status: "bad",
        msg: "username sudah di pakai",
      });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const newUser = await new User({
      username,
      password: hashedPass,
      fullname,
      gender
    });
    const savedUser = await newUser.save();
    const token = await jwt.sign({ savedUser }, process.env.TOKEN_KEYWORD);

    res.json({
      status: "ok",
      msg: "berhasil daftar!",
      user: savedUser,
      token,
    });
  } catch (error) {
    console.log(error.message);
  }
});

//login
router.post("/login", authMiddleware.login, async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const user = await User.findOne({ username });

    const comparedPass = await bcrypt.compare(password, existUser.password);
    if (!comparedPass) {
      return res.json({
        status: "bad",
        msg: "password salah",
      });
    }

    const token = await jwt.sign({ user }, process.env.TOKEN_KEYWORD);

    res.json({
      status: "ok",
      msg: "berhasil login !",
      user,
      token,
    });
  } catch (error) {
    console.log(error.message);
  }
});

// admin login
router.post('/admin', async (req, res) => {

  try {
    const { username, password } = req.body
    
    if(!username || !password){
 return res.json({status: 'bad', msg:'username atau password kosong!'})}

 if(!username !== process.env.ADMIN_LOGIN ){
  return res.json({status: 'bad', msg:'username salah!'})}
 
  if(password !== process.env.ADMIN_PASS){
    return res.json({status: 'bad', msg:'password salah!'})}

    const token = jwt.sign({user: {username, password}}, process.env.TOKEN_KEYWORD)

res.json({status: 'ok', msg: 'admin berhasil login', token})
  } catch (error) {
console.log(error.message)
  }
})
module.exports = router;
