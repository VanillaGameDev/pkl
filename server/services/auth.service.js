const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

class AuthService {
  async register(data) {
    try {
      const { username, password, fullname, gender } = data;
      const hashedPass = await bcrypt.hash(password, 10);

      const newUser = await new User({
        username,
        password: hashedPass,
        fullname,
        gender,
      });

      const savedUser = await newUser.save();

      const token = await jwt.sign(
        { user: savedUser },
        process.env.TOKEN_KEYWORD
      );

      return {
        status: "ok",
        msg: "Anda telah berhasil mendaftar!",
        user: savedUser,
        token,
      };
    } catch (error) {
      console.log(error.message);
    }
  }

  async login(data) {
    try {
      const { username, password } = data;

      const user = await User.findOne({ username });

      const hashedPass = await bcrypt.hash(password, 10);

      const token = await jwt.sign({ user }, process.env.TOKEN_KEYWORD);

      return {
        status: "ok",
        msg: "Anda berhasil masuk!",
        user,
        token,
      };
    } catch (error) {
      console.log(error.message);
    }
  }

  async admin(data) {
    try {

      const { username, password } = data;
      const token = jwt.sign(
        { user: { username, password } },
        process.env.TOKEN_KEYWORD
      );
      return {
        status: "ok",
        msg: "Anda masuk sebagai admin",
        token,
      };
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = AuthService;
