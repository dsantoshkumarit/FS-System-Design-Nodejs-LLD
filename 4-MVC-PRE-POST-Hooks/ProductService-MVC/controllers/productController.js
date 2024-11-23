const app = require("express")();
const productModel = require("../models/product");

const getAllProducts = async (req,res,next) => {
    try{
        const allProducts = await productModel.find();
        const html = `
            ${
                allProducts.map(product=>
                    `<div>
                        <ul>
                            <li>
                                ID : ${product._id}
                            </li>
                            <li>
                                NAME : ${product.product_name}
                            </li>
                            <li>
                                PRICE : ${product.product_price}
                            </li>
                            <li>
                                CATEGORY : ${product.category}
                            </li>
                            <li>
                                DESCRIPTION : ${product.product_description}
                            </li>
                        </ul>
                    </div>`
                )
            }
        `;
        res.send(html);
    }
    catch(error){
        next(error);
    }
};
const addProduct = async(req,res,next) => {
    try{
        const {product_name, product_price, category,isInStock, product_description} = req.body;
        const newProduct = await productModel.create({product_name, product_price, category, isInStock, product_description});
        res.status(200).json({message: "Product Added", newProduct});
    }
    catch(error){
        next(error);
    }
};
const updateProduct = async(req, res, next) => {
    try{
        const {id} = req.params;
        const productFound = await productModel.findByIdAndUpdate(id, req.body);
        if(!productFound){
            res.status(404);
            throw new Error("Product not found");
        }
        const updatedProduct = await productModel.findById(id);
        res.status(200).json({
            message : "Product updated",
            updatedProductDetails : updatedProduct
        });
    }
    catch(err){
        next(err);
    }
};
const deleteProduct = async(req, res, next) => {
    try{
        const {id} = req.params;
        const productFound = await productModel.findByIdAndDelete(id);
        if(!productFound){
            res.status(404);
            throw new Error("Product not found");
        }
        res.status(200).json({
            message : "Product Deleted",
        });
    }
    catch(err){
        next(err);
    }
};
const getProductById = async(req, res, next) => {
    try{
        const {id} = req.params;
        const productFound = await productModel.findById(id);
        if(!productFound){
            res.status(404);
            throw new Error("Product not found");
        } 
        res.status(200).json({
            message : 'Product Found',
            productDetails : productFound
        })
    }
    catch(err){
        next(err);
    }
};

module.exports = {
    getAllProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById
};