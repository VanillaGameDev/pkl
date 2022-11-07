const jwt = require("jsonwebtoken");
const User = require("../models/User");

class AuthMiddleware {
  async register(req, res, next) {
    try {
      const { username, password, fullname, gender } = req.body;
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
      if (username === process.env.ADMIN_LOGIN) {
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
        gender,
      });
      const savedUser = await newUser.save();
      const token = await jwt.sign({ savedUser }, process.env.TOKEN_KEYWORD);

      res.json({
        status: "ok",
        msg: "berhasil daftar!",
        user: savedUser,
        token,
      });
      next();
    } catch (error) {
      console.log(error.message);
    }
  }

  async login(req, res, next) {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.json({
          status: "bad",
          msg: "username atau password kosong",
        });
      }
      const existUser = await User.findOne({ username });

      if (!existUser) {
        return res.json({
          status: "bad",
          msg: "username tidak ada",
        });
      }

      const comparedPass = await bcrypt.compare(password, existUser.password);
      if (!comparedPass) {
        return res.json({
          status: "bad",
          msg: "password salah",
        });
      }
      next();
    } catch (error) {
      console.log(error.message);
    }
  }
  async admin(req, res, next) {
    try {
      const { username, password } = data;
      if (!username || !password) {
        return res.json({
          status: "bad",
          msg: "username atau password kosong!",
        });
      }

      if (!username !== process.env.ADMIN_LOGIN) {
        return res.json({ status: "bad", msg: "username salah!" });
      }

      if (password !== process.env.ADMIN_PASS) {
        return res.json({ status: "bad", msg: "password salah!" });
      }

      const token = jwt.sign(
        { user: { username, password } },
        process.env.TOKEN_KEYWORD
      );
    } catch (error) {}
  }
}

module.exports = AuthMiddleware;
