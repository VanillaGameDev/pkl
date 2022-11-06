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
  try {
    const result = await authService.register(req.body)
    res.json(result)
  } catch (error) {
    console.log(error.message)

  }

});

//login
router.post("/login", authMiddleware.login, async (req, res) => {
  try {
    const result = await authService.login(req.body)
    res.json(result)
  } catch (error) {
    console.log(error.message)


  }
});

// admin login
router.post('/admin', async (req, res) => {
  try {
    const resuilt = await authService.admin(req.body)
    res.json(result)
  } catch (error) {
    console.log(error.message)
  }
})
module.exports = router;
