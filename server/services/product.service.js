const product = require('../models/Product')

class ProductService {
    async Upload(data) {
        try {
            const { NameProduct, Desc, Qty, Cover, Category, Price } = data;


            const newProduct = await new Product({
                NameProduct, Desc, Qty, Cover, Category, Price
            });

            const savedProduct = await newProduct.save();
            return {
                status: "ok",
                msg: "Akun Berhasil Di Upload",
                Product: savedProduct,

            };
        } catch (error) {
            console.log(error.message);
        }
    }
}
module.exports = ProductService;