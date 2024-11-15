import mongoose from "mongoose";
import Product from "../models/product.model.js"

/*
    Controllers handle the requests from the routers and the app.
    They are basically what creates and transforms data based on the application.

    All of these are prepended by the {export} keyword, which lets other files access
*/

export const getProducts  = async (req, res) => {
    try {
        // gets all products by fetching it using mongoose. 
        // uses the schema created in product.model.js
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.log("Error in fetching products", error.message);
        res.status(500).json({success:false, message: "Server error"});
    }
}

export const createProduct = async (req, res) => {
    const product = req.body;

    // if any of the fields are missing, prompt the user.
    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({success:false, message: "Please provide all fields"});
    }

    // create a new product object using the information stored in the body
    const newProduct = new Product(product);

    try {
        // saves the new product in the database
        await newProduct.save();
        res.status(201).json({success:true, data: newProduct});
    } catch (error) {
        console.error("Error in creating product:", error.message);
        res.status(500).json({success: false, message: "Server error"});
    }
}

export const updateProduct = async (req, res) => {
    // Gets only the id variable from the parameters.
    const { id } = req.params;

    const product = req.body;

    // checks if the id of the product exists in the data base
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success: false, message: "Invalid product id"});
    }

    try {
        // uses the id, and the product information to update the product
        // after that, it returns the updated product that you can use to update the UI
        // {new:true} | {false} - return the original product {true} - the updated product
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new:true});
        res.status(200).json({success: true, data: updatedProduct});
    } catch (error) {
        res.status(500).json({success: false, message: "Server error"});
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success: false, message: "Invalid product id"});
    }
    
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Product deleted"});
    } catch (error) {
        console.log("Error in deleting product", error.message);
        res.status(500).json({success: false, message: "Server error"});
    }
}