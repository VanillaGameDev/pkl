const { Router } = require("express");
const router = Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AuthMiddleware = require('../middlewares/auth.middleware')
const AuthService = require('../services/auth.service')

const authMiddleware = new AuthMiddleware()

const authService = new AuthService()
  
//register
router.post("/register", authMiddleware.register, async (req, res) => {
 
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
