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
}

module.exports = authService