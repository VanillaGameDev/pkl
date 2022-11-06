const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

class authService{
    async register(data){
        try {
            const { username, password, fullname, gender, } = data;           
        
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
}
 async login(data) {
  try {
    const { username, password } = data;
    
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
 }
 async admin(data){
  try {
    const { username, password } = data
    
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
 }
}

module.exports = authService