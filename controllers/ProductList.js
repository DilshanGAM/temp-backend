import mongoose from 'mongoose';
import ProductList from '../models/ProductList.js';

const productList = mongoose.model("productList", ProductList);


// Add product
export const addProduct = async (req, res) => {
    try {
        const productData = req.body;
        const newProduct = new productList(productData);
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
        console.log('Success');
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
}

// Get all product
export const getAllProduct = async (req, res) => {
    try {
        const products = await productList.find();
        res.status(201).json(products);
    }
    catch (err) {
        res.status(500).json({ meesage: err.messsge});
    }
}

// get product by id
export const getProductById = async (req, res) => {
    const getById = req.params.id;
    try {
        const productById = await productList.findById(getById);
        if(!productById) {
            return res.status(404).send();
        }
        res.status(200).send(productById);
    }
    catch(err) {
        res.status(500).send(err);
    }
}

// Delete product by id
export const deleteProduct = async (req, res) => {
    const getById = req.params.id;
    try {
        await productList.findByIdAndDelete(getById).then((result) => {
            res.status(200).json(result);
        })
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
}

// Update product by id
export const updateProduct = async (req, res) => {
    const getById = req.params.id;
    const productData = req.body;
    try{
        await productList.findByIdAndUpdate(getById, productData, { new: true}).then((result) => {
            res.status(200).json(result);
        })
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
}

// Search by product name
export const searchByProductName = async (req, res) => {
    try {
        const productName  = req.params.productName;
        if(!productName) {
            return res.status(400).send({ message: 'Product Name required'});
        }
        const searchProduct = await productList.find({ productName: { $regex: productName, $options: 'i' } });
        res.status(200).json(searchProduct);
    }
    catch(err) {
        console.error(err);
        res.status(500).json({ message: err.meesage })
    }
}