const Router = require('express').Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const TokenMiddleWare = require("../middlewares/token.middleware")
const router = Router;

const tokenMiddleWare = new TokenMiddleWare()
//update
router.put('/:id', tokenMiddleWare.checkAll, async (req, res) => {
    console.log(req.body)
    try {
        const { username } = req.body.account
        const token = req.headers.authorization?.split('')[1]
        const decodedUser = jwt.decode(token, process.env.TOKEN_KEYWORD)
        const currentUser = await User.findById(req.params.id)
        if (currentUser._id.toString() !== decodedUser._id && decodedUser.username
            !== process.env.ADMIN_LOGIN) {
            return res.json({ status: 'bad', msg: "Error On Validation " })

        }

        const existUserWithUsername = await User.findOne({ username });
        if (
            existUserWithUsername &&
            existUserWithUsername._id.toString() !== decodedUser.user._id
        ) {
            return res.json({
                status: "bad",
                msg: " Nama pengguna ini telah digunakan, silakan pilih yang lain!",
            });
        }

        if (username !== process.env.ADMIN_LOGIN) {
            return res.json({
                status: "bad",
                msg: "Nama pengguna ini tidak dapat digunakan",
            });
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body.account,
        }, { new: true });
        res.json({ status: 'ok', msg: 'Berhasil Diupdate!', account: updatedUser })
    } catch (error) {
        console.log(error.message)
    }
})
//get user
router.get('/:id', tokenMiddleWare.checkAll,async (req, res) => {
    try {
        const token = req.headers.authorization?.split('')[1]
        const decodedUser = jwt.decode(token, process.env.TOKEN_KEYWORD)
        const currentUser = await User.findById(req.params.id)
        if (currentUser._id.toString() !== decodedUser._id && decodedUser.username !== process.env.ADMIN_LOGIN) {
            return res.json({ status: 'bad', msg: "Error On Validation " })

        }
        const user = await User.findById(req.params.id)

        if (!user) {
            return res.json({ status: 'bad', msg: "User Tidak Ada!" });
        }
        res.json({ status: 'ok', account: user })
    } catch (error) {
        console.log(error.message)
    }
})

//delete
router.delete('/:id', tokenMiddleWare.checkAll, async (req, res) => {
    try {
        const token = req.headers.authorization?.split('')[1]
        const decodedUser = jwt.decode(token, process.env.TOKEN_KEYWORD)
        const currentUser = await User.findById(req.params.id)
        if (currentUser._id.toString() !== decodedUser._id && decodedUser.username !== process.env.ADMIN_LOGIN) {
            return res.json({ status: 'bad', msg: "Error On Validation " })

        }
        await User.findByIdAndDelete(req.params.id)

        res.json({ status: "ok", msg: "Berhasil Menghapus" })
    } catch (error) {
        console.log(error.message)

    }
})

module.exports = router;

