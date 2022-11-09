const { Router } = require("express");
const router = Router();
const ProductService = require('../services/product.service')

const productService = new ProductService();

router.post("/upload", productService.Upload, async (req, res) => {
    try {
        const result = await authService.Upload(req.body);

        res.json(result);
    } catch (error) {
        console.log(error.message);
    }
});