const Router = require("express").Router();
const router = Router;

let Product = require('../models/Product');

router.post("/upload", authMiddleware.register, async (req, res) => {
    try {
        const result = await authService.register(req.body);

        res.json(result);
    } catch (error) {
        console.log(error.message);
    }
});

module.exports = router;